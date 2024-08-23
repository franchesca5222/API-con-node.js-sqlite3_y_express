const Post = require('../models/post');

const createPost = (req, res) => {
    const { author, title, ispublished } = req.body;
    console.log("body",req.body);
    Post.createPost(author, title, ispublished, (err, post) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(post);
    });
};

const getPosts = (req, res) => {
    const filters = {
        author: req.query.author,
        ispublished: req.query.ispublished === 'true' ? 1 : req.query.ispublished === 'false' ? 0 : undefined,
    };
    Post.getPosts(filters, (err, posts) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(posts);
    });
};

const getPostById = (req, res) => {
    const { id } = req.params;
    Post.getPostById(id, (err, post) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!post) {
            return res.status(404).send('ID not found');
        }
        res.status(200).json(post);
    });
};

const methodNotAllowed = (req, res) => {
    res.status(405).send('Method not allowed');
};

module.exports = { createPost, getPosts, getPostById, methodNotAllowed };
