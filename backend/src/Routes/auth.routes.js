import express from "express";
import { signupValidation, loginValidation } from "../Middleware/authvalidation.js";
import authController from "../Controllers/auth.controller.js";

const router = express.Router();

router.post('/login', loginValidation, authController.login);
router.post('/signup', signupValidation, authController.signup);

export default router;