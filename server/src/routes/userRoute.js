import express from "express";
import AuthController from "../controllers/userController.js";
import errorHandler from "../services/catchAsyncError.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { role } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/register").post(errorHandler(AuthController.registerUser));
router.route("/login").post(errorHandler(AuthController.loginUser));
console.log(authMiddleware);
router
  .route("/user/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(role.Instructor),
    errorHandler(AuthController.updateUser)
  );
export default router;
