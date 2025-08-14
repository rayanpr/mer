import express from "express";
import {login , logout, register} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/sign-up', register);
router.post('/sign-in', login);
router.post('/log-out', logout);

export default router