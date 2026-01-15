import Blog from "../models/Blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required"
      });
    }

    const { title, category, sections, publishedAt } = req.body;

    if (!title || !category || !sections) {
      return res.status(400).json({
        success: false,
        message: "Title, category and sections are required"
      });
    }

    if (!req.admin?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // 🔹 Parse sections JSON
    let parsedSections;
    try {
      parsedSections = JSON.parse(sections);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid sections format"
      });
    }

    const blog = await Blog.create({
      title,
      category,
      image: imageUrl,
      sections: parsedSections,
      publishedAt: publishedAt || new Date(),
      createdBy: req.admin._id
    });

    res.status(201).json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    if (updateData.sections) {
      updateData.sections = JSON.parse(updateData.sections);
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

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

  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog"
    });
  }
};




export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Blog deleted" });
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .select("title category image publishedAt createdAt")
      .sort({ createdAt: -1 });

    res.json({
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
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy", "name");

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

  } catch (error) {
    console.error("GET BLOG ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog"
    });
  }
};