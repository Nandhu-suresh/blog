const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL or base64 usually, sticking to simple string for now
    author: { type: String, default: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
