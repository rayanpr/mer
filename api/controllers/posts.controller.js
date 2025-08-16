import { errorHandler } from "../utiles/error.js";
import Post from "../models/posts.model.js";


export const createPost = async (req, res, next) => {
    if(!req.body.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post'));
    }
    if(!req.body.title || !req.body.content || !req.body.category || !req.file){
        return next(errorHandler(400,'All fields are required'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const post = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.file.path,
        userId: req.user.id,
        slug: slug
    };
    try {
        const newPost = await Post.create(post);
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: newPost
        });
    } catch (error) {
        next(errorHandler(500, 'Internal Server Error'));
    }


};
export const getPosts = async (req, res) => {};
export const getPost = async (req, res) => {};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {};
  