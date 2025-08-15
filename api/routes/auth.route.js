import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import {login , logout, register,loginWithGoogle} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/sign-up', register);
router.post('/sign-in', login);
router.post('/sign-out', logout);
router.post('/google',loginWithGoogle);

export default router