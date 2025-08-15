import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePic: {
        type: String,
        default: "https://i.pinimg.com/564x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.jpg",
    },
}, {
    timestamps: true,
});
export default mongoose.model("User", UserSchema);      

