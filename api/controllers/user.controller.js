// import fs from 'fs';
// import { errorHandler } from '../utiles/error.js';

// export const upploadPic = (req, res,next) => {
//    if(req.file){
//     const {path,originalname} = req.file;
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     const newPath = path+'.' + ext
//     fs.renameSync(path, newPath);
//     console.log('newPath', newPath);
// ; // Normalize path for cross-platform compatibility
//     res.status(200).json(newPath.replace('api/uploads/', ''));
//    }else {
//     return next(errorHandler(400, 'No file uploaded'));
//    }
   
// }
import fs from 'fs';
import path from 'path';
import { errorHandler } from '../utiles/error.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// Function to handle profile picture upload
export const upploadPic = (req, res, next) => {
  if (req.file) {
    const { path: tempPath, originalname } = req.file;
    const ext = path.extname(originalname);
    const newFilename = `${Date.now()}${ext}`;
    const newPath = path.join(path.dirname(tempPath), newFilename);

    fs.renameSync(tempPath, newPath);

    const relativePath = `api/uploads/${newFilename}`.replace(/\\/g, '/');
    console.log('newPath:', relativePath);

    res.status(200).json({ profilePic: relativePath });
  } else {
    return next(errorHandler(400, 'No file uploaded'));
  }
};

export const updateProfile = async(req, res, next) => {
    const { username, email, password, profilePic } = req.body;
    const userId = req.user.id;
   
    if(userId !== req.params.id) {
        return next(errorHandler(403, 'You can only update your own profile'));
    }
    let hashedPassword = req.user.password;
    if(password){
        if (password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters long'));
        }
          const salt = bcrypt.genSaltSync(10);
          hashedPassword = bcrypt.hashSync(password, salt);

    }
    if (username) {
        if (username.length < 3 || username.length > 20) {
            return next(errorHandler(400, 'Username must be between 3 and 20 characters long'));
        }
        if (username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (username.match(/[^a-zA-Z0-9]/)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
   }
   
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username:username,
                email: email,
                password: hashedPassword,
                profilePic:  profilePic || req.user.profilePic,

            }
        }, { new: true });
        if(!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }
        res.status(200).json(updatedUser);
    }catch (error) {
        return next(errorHandler(500, 'Internal server error'));
    }


}

export const deleteProfile = async (req, res, next) => {
    const userId = req.params.id;
    if (userId !== req.user.id) {
        return next(errorHandler(403, 'You can only delete your own profile'));
    }
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return next(errorHandler(404, 'User not found'));
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        return next(errorHandler(500, 'Internal server error'));
    }
}
 export const getUsers = async (req, res, next) => {
    const id = req.params.id;
    try {
        if(id){
            const user = await User.findById(id).select('-password');
            if(!user){
                return next(errorHandler(404, 'User not found'));
            }
            return res.status(200).json({user});
        }
        const users = await User.find().select('-password');
        res.status(200).json({users});
    } catch (error) {
        return next(errorHandler(500, 'Internal server error'));
    }
 }

