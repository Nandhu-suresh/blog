const router = require('express').Router();
const User = require('../models/User');

// Hardcoded Admin Credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin@123'
};

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === ADMIN_CREDENTIALS.username) {
            return res.status(400).json({ message: "Cannot register as admin" });
        }

        // Check if user exists
        const existingSearch = await User.findOne({ username });
        if (existingSearch) return res.status(400).json({ message: "User already exists" });

        // Store plain text as per simple request (Warning: Not production safe)
        // In a real app, hash this password!
        const newUser = new User({ username, password });
        const user = await newUser.save();
        res.status(200).json({ _id: user._id, username: user.username, role: 'user' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check Admin
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            return res.status(200).json({ username: 'admin', role: 'admin' });
        }

        // Check User
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Wrong credentials" });

        // Simple password check
        if (user.password !== password) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        res.status(200).json({ _id: user._id, username: user.username, role: 'user' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
