import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { getComments, getComment, createComment, updateCommentAndLikes, deleteComment, updateComment} from "../controllers/comment.controller.js";

const router = express.Router();

router.get('/', getComments);
router.get('/get-comment/:postId', getComment);
router.post('/create-comment', AuthMiddleware, createComment);
router.put('/likes/:commentId', AuthMiddleware, updateCommentAndLikes);
router.put('/update-comment/:commentId', AuthMiddleware, updateComment);
router.delete('/:id', AuthMiddleware, deleteComment);

export default router