import Blog from "../models/Blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required",
      });
    }

    const { title, content, category, publishedAt } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content and category are required",
      });
    }

    if (!req.admin?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      category,
      image: imageUrl,
      publishedAt: publishedAt || new Date(),
      createdBy: req.admin._id,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
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

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found"
    });
  }

  res.json({
    success: true,
    data: blog
  });
};