import express from 'express';
import path from 'path';
import { upploadPic , updateProfile, deleteProfile,getUsers} from '../controllers/user.controller.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import multer from 'multer';


const upload = multer({ dest:  'api/uploads'});
const router = express.Router();

router.post('/upload-pic', AuthMiddleware,  upload.single('profilePic'), upploadPic);
router.put('/update-profile/:id', AuthMiddleware, updateProfile);
router.delete('/delete-profile/:id', AuthMiddleware, deleteProfile);
router.get('/', AuthMiddleware, getUsers);
 // Assuming you have a deleteProfile function

export default router;
