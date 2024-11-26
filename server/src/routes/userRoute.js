import express from "express";
import AuthController from "../controllers/userController.js";
import errorHandler from "../services/catchAsyncError.js";
const router = express.Router();
router.route("/register").post(errorHandler(AuthController.registerUser));
router.route("/login").post(errorHandler(AuthController.loginUser));
export default router;
