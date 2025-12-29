const router = require('express').Router();
const Blog = require('../models/Blog');

// CREATE POST (Admin only logic can be handled in frontend or here, for now public endpoint intended for admin use)
router.post('/', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POST BY ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json("Blog has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
