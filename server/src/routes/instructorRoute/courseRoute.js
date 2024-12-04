import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../../controllers/instructorController/courseController.js";
import errorHandler from "../../services/catchAsyncError.js";
import authMiddleware, { role } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.route("/courses").post(createCourse).get(getAllCourses);

router
  .route("/courses/:id")
  .put(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(role.Instructor),
    updateCourse
  )
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(role.Instructor),
    getCourseById
  )
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(role.Instructor),
    deleteCourse
  );

export default router;
