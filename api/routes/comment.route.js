import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { getComments, getComment, createComment, updateComment, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.get('/', getComments);
router.get('/get-comment/:postId', getComment);
router.post('/create-comment', AuthMiddleware, createComment);
router.put('/:id', AuthMiddleware, updateComment);
router.delete('/:id', AuthMiddleware, deleteComment);

export default router