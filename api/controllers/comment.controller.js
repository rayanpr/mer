import Comment from '../models/comments.model.js';
import { errorHandler } from '../utiles/error.js';

// export const createComment = async (req, res, next) => {


//  const { value, postsId } = req.body;
// const userId = req.user.id;
//  if(req.body.userId !== req.user.id){
//      return next(errorHandler(403, 'You are not allowed to create a comment'));
//  }
//  try {
//     const newComment  = new Comment({value,postsId,userId});
//     await newComment.save();
//     res.status(201).json(newComment);
//  } catch (error) {
//     next(errorHandler(500, 'Internal Server Error'));
//  }
// };


export const createComment = async (req, res, next) => {
    const { value, postsId ,userId} = req.body;
    if(req.body.userId !== req.user.id){
        return next(errorHandler(403, 'You are not allowed to create a comment'));
    }
    try {
       const commentDoc = await Comment.create({value:value,postId:postsId,userId:userId});
       res.status(201).json(commentDoc);
    } catch (error) {
       next(errorHandler(500, 'Internal Server Error'));
    }
   }
export const deleteComment = async (req, res, next) => {};
export const updateComment = async (req, res, next) => {};
export const getComment = async (req, res, next) => {
   const {postId} = req.params;
    try {
        const comments = await Comment.find({postId: postId}).sort({createdAt: -1});
        res.status(200).json(comments);
    } catch (error) {
        next(errorHandler(500, 'Internal Server Error'));
    }
};
export const getComments = async (req, res, next) => {}; 