const express = require('express');

const {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
} = require('../controllers/posts')

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/posts', getPosts).post('/posts', auth, createPost);
router.patch('/posts/:id', auth, updatePost).delete('/posts/:id', auth, deletePost);
router.patch('/posts/:id/likePost', auth, likePost);

module.exports = router;
