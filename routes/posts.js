const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    methodNotAllowed
} = require('../controllers/postscontroller');

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.delete('/:id', methodNotAllowed);
router.put('/:id', methodNotAllowed);
router.patch('/:id', methodNotAllowed);

module.exports = router;
