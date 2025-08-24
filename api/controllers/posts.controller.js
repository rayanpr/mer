import { errorHandler } from "../utiles/error.js";
import Post from "../models/posts.model.js";
import fs from 'fs';
import path from 'path';


export const createPost = async (req, res, next) => {
    const { title, value, category, image } = req.body;
    const userId = req.user.id;
    console.log("body", req.body);
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post'));
    }
    if(!title || !value || !category){
        return next(errorHandler(400,'All fields are required'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const post = {title,value, category, image,userId, slug: slug};
    
    try {
        const newPost = await Post.create(post);
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: newPost,
           


        });
    } catch (error) {
        next(errorHandler(500, 'Internal Server Error'));
    }


};
export const uploadedFile = async (req, res, next) => {
    if (req.file) {
        const { path: tempPath, originalname } = req.file;
        const ext = path.extname(originalname);
        const newFilename = `${Date.now()}${ext}`;
        const newPath = path.join(path.dirname(tempPath), newFilename);
        fs.renameSync(tempPath, newPath);
        const relativePath = `api/uploads/${newFilename}`.replace(/\\/g, '/');
        res.status(200).json({ image: relativePath });
    } else {
        return next(errorHandler(400, 'No file uploaded')); 
    }
};
export const getPosts = async (req, res, next) => {
    const slug = req.query.postSlug;
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1;
        const postsDoc  = await Post.find({
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.userId && { userId: req.query.userId }),
            ...(slug && { slug }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.search && {
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { value: { $regex: req.query.search, $options: 'i' } }
                ]
            }),
        }).sort({ updatedAt: sortDirection })
          .skip(startIndex)
          .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo =  new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo }
    });
        res.status(200).json({
            success: true,
            posts: postsDoc,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        return next(errorHandler(500, 'Internal server error'));
    }        
}
export const getPost = async (req, res) => {};
export const updatePost = async (req, res) => {
   const {postId, userId} = req.params;
   const { title, value, category, image } = req.body;
   if(!req.user.isAdmin && req.user.id !== userId){
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    if(!title || !value || !category){
            return next(errorHandler(400, 'All fields are required'));
        }
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
           {
            $set: {
                title,
                value,
                category,
                image
            }
           },
            { new: true }
        );
        if (!updatedPost) {
            return next(errorHandler(404, 'Post not found'));
        }else{
            res.status(200).json({
                success: true,
                message: 'Post updated successfully',
                post: updatedPost
            });
        }
        } catch (error) {
        return next(errorHandler(500, 'Internal server error'));
    }
};
export const deletePost = async (req, res,next) => {
    const {postId, userId} = req.params;
    if(!req.user.isAdmin && req.user.id !== userId){
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try{
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return next(errorHandler(404, 'Post not found'));
        }else{
            res.status(200).json({
                success: true,
                message: 'Post deleted successfully',
                post: deletedPost
            });
        }
    } catch (error) {
        return next(errorHandler(500, 'Internal server error'));
    }
};

  