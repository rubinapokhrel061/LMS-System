import express from "express";
import AuthController from "../controllers/userController.js";

const router = express.Router();
router.route("/register").post(AuthController.registerUser);
export default router;
