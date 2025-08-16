import User from "../models/user.model.js";
import { errorHandler } from "../utiles/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
export const login = async(req, res, next) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return next(errorHandler(400, "User not found"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(errorHandler(400, "Wrong password"));
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin,username: user.username, email: user.email}, process.env.JWT);
        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true
        }).status(200).json({...otherDetails});
    }catch(error){
        next(errorHandler(400, error.message));
    }       
};

export const register = async(req, res, next) => {
    const { username, email, password, confirmPassword} = req.body;
  try{
    if(password !== confirmPassword) return next(errorHandler(400, "Password and confirm password do not match"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({username, email, password: hash});
    res.status(200).json("User has been created" , newUser);
   }catch(error){   
     next(errorHandler(400, error.message));
   }
};

export const logout = (req, res, next) => {
   try{
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json({message: "User has been logged out", success: true});
   }catch(error){
    next(errorHandler(400, error.message));
   }
};

export const loginWithGoogle = async(req, res, next) => {
    const {username, email, imageUrl} = req.body;
    try{
        const userDoc =  await User.findOne({email});
        if(userDoc){
            const token = jwt.sign({id: userDoc._id, isAdmin: userDoc.isAdmin,username: userDoc.username, email: userDoc.email}, process.env.JWT);
            const {password, ...otherDetails} = userDoc._doc;
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true
            }).status(200).json({...otherDetails});
        }else{
            const generatedPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const hash = bcrypt.hashSync(generatedPassword, salt);
            const newUser = await User.create({username, email,profilePic: imageUrl, password: hash});
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin,username: newUser.username, email: newUser.email}, process.env.JWT);
            const {password,...otherDetails} = newUser._doc;
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true
            }).status(200).json({...otherDetails});
        }
    }catch(error){
        next(errorHandler(400, error.message));
    }
}