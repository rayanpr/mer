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
    }).status(200).json("User has been logged out");
   }catch(error){
    next(errorHandler(400, error.message));
   }
};

export const loginWithGoogle = async(req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin,username: user.username, email: user.email}, process.env.JWT);
            const { isAdmin, ...otherDetails} = user._doc;
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true
            }).status(200).json({...otherDetails});
        }else{
            const password = Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const hashPassword = bcrypt.hashSync(password, salt);
            const newUser = await User.create({...req.body, hashPassword});
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin,username: newUser.username, email: newUser.email}, process.env.JWT);
            const {isAdmin, ...otherDetails} = newUser._doc;
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true
            }).status(200).json({...otherDetails});
        }
    }catch(error){
        next(errorHandler(400, error.message));
    }
}