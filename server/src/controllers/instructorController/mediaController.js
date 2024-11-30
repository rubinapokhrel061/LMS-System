import {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from "../../../helpers/cloudinary.js";

class mediaController {
  static async uploadMedia(req, res) {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }
    const result = await uploadMediaToCloudinary(req.file.path);

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  static async deleteMedia(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Assest Id is required",
      });
    }
    await deleteMediaFromCloudinary(id);

    res.status(200).json({
      success: true,
      message: "Assest deleted successfully from cloudinary",
    });
  }
}
export default mediaController;
