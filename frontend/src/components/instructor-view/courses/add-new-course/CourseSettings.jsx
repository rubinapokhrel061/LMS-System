import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APIForMedia } from "@/http";
import {
  setImage,
  setIsUploading,
} from "@/./store/instructorSlice/courseSettingSlice";

const CourseSettings = () => {
  const dispatch = useDispatch();
  const { formData, isUploading } = useSelector((state) => state.courseLanding);

  const handleImageUploadChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageData = new FormData();
      imageData.append("file", selectedImage);

      try {
        dispatch(setIsUploading(true));

        const response = await APIForMedia.post("media/upload", imageData);
        if (response.data.success) {
          dispatch(setImage(response.data.data.url)); // Update the image in Redux store
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        dispatch(setIsUploading(false));
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Setting</CardTitle>
      </CardHeader>
      <CardContent>
        {formData.image ? (
          <img src={formData.image} alt="Uploaded course image" />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image:</Label>
            <div>
              {formData.image ? (
                <div className="text-green-500 text-xs">Image Uploaded</div>
              ) : isUploading ? (
                <div className="text-blue-500 text-xs">Uploading image...</div>
              ) : (
                <div className="text-red-500 text-xs">
                  Please select an image to upload
                </div>
              )}
              <Input
                onChange={handleImageUploadChange}
                className="bg-green-300"
                type="file"
                accept="image/*"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
