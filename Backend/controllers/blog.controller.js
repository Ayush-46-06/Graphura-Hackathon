import Blog from "../models/Blog.model.js";

export const createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    createdBy: req.user._id
  });

  res.status(201).json({ success: true, data: blog });
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ success: true, data: blog });
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Blog deleted" });
};

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json({ success: true, data: blogs });
};

export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json({ success: true, data: blog });
};
