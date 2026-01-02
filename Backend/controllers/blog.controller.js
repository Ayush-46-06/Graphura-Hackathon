import Blog from "../models/Blog.model.js";

export const createBlog = async (req, res) => {
  const imageUrl = req.file?.path;

  if (!imageUrl) {
    return res.status(400).json({
      success: false,
      message: "Blog image is required",
    });
  }

  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    image: imageUrl,
    publishedAt: req.body.publishedAt,
    createdBy: req.admin._id,
  });

  res.status(201).json({
    success: true,
    data: blog,
  });
};

export const updateBlog = async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = req.file.path;
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  res.json({ success: true, data: blog });
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Blog deleted" });
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs
    });

  } catch (error) {
    console.error("GET BLOGS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs"
    });
  }
};



export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json({ success: true, data: blog });
};
