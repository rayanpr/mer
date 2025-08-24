import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        numberOfLikes: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Array,
            default: [],
        },
    }, {
        timestamps: true,
    });
    
    const Comment = mongoose.model("Comment", CommentSchema);
    
    export default Comment;