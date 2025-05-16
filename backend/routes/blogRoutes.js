
const express = require('express');
const router = express.Router();
const { 
  getBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  getBlogById 
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .get(protect, getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
