import express from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost, uploadedFile } from '../controllers/posts.controller.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import multer from 'multer';
const upload = multer({ dest: 'api/uploads' }); // Set the destination for uploaded files

const router = express.Router();
// Route to create a new post
router.post('/create-post', AuthMiddleware,  createPost);
// Route to get all posts
router.get('/', getPosts);
// Route to get a specific post by ID
router.get('/post/:id', getPost);
// Route to update a post by ID
router.put('/update-post/:postId/:userId', AuthMiddleware,  updatePost);
// Route to delete a post by ID
router.delete('/delete-post/:id', AuthMiddleware, deletePost);
// Route to upload an image for a post
router.post('/upload-image', AuthMiddleware, upload.single('image'),uploadedFile);



export default router