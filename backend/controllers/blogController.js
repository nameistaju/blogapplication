
const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

// @desc    Get all blogs
// @route   GET /blogs
// @access  Private
const getBlogs = asyncHandler(async (req, res) => {
  const filters = {};

  // Add category filter if provided
  if (req.query.category) {
    filters.category = req.query.category;
  }

  // Add author filter if provided
  if (req.query.author) {
    filters.author = req.query.author;
  }

  const blogs = await Blog.find(filters).sort('-createdAt');
  res.status(200).json(blogs);
});

// @desc    Create new blog
// @route   POST /blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, category, content, image } = req.body;

  if (!title || !category || !content) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  // Get user for author info
  const user = await User.findById(req.user.id);

  const blog = await Blog.create({
    title,
    category,
    author: user.name,
    content,
    image,
    userId: req.user.id,
  });

  res.status(201).json(blog);
});

// @desc    Update blog
// @route   PUT /blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if user is the author of the blog
  if (blog.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to update this blog');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedBlog);
});

// @desc    Delete blog
// @route   DELETE /blogs/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if user is the author of the blog
  if (blog.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to delete this blog');
  }

  await Blog.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

// @desc    Get blog by ID
// @route   GET /blogs/:id
// @access  Private
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  res.status(200).json(blog);
});

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
};
