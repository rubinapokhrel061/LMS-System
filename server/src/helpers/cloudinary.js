import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_APT_SECRET,
});

// Upload an image
export const uploadMediaToCloudinary = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return uploadResult;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete assest from cloudinary");
  }
};
