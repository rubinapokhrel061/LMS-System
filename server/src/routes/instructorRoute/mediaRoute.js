//routes/instructorRoute/mediaRoute.js
import express from "express";
import multer from "multer";
import mediaController from "../../controllers/instructorController/mediaController.js";
import errorHandler from "../../services/catchAsyncError.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router
  .route("/upload")
  .post(upload.single("file"), errorHandler(mediaController.uploadMedia));
router.route("/delete/:id").delete(errorHandler(mediaController.deleteMedia));
export default router;
