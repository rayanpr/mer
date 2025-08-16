import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    },
  content: {
    type: String,
    required: true,
    },
  category: {
    type: String,
    default:'uncategorized',
    },
  image: {
    type: String,
    default: "https://sophie-blitman.fr/wp-content/uploads/2017/04/Post-it-%C2%A9-Flickr-Ignacio-Palomo-Duarte-1-1024x680.jpg",
    },
  slug: {
    type: String,
    required: true,
    unique: true,
    },
  userId: {
    type: String,
    required: true,
    },
},{
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
export default Post