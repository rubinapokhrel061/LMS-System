import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APIForMedia } from "@/http";
import React, { useState } from "react";

const CourseSettings = () => {
  const [image, setImage] = useState({ image: "" });
  const [isUploading, setIsUploading] = useState(false);
  const handleImageUploadChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageData = new FormData();
      imageData.append("file", selectedImage);

      try {
        setIsUploading(true);
        const response = await APIForMedia.post("media/upload", imageData);
        console.log(response);
        if (response.data.success) {
          setImage({
            image: response?.data?.data?.url,
          });
          setIsUploading(false);
        }
      } catch (error) {
        setIsUploading(false);
        console.error("Error uploading image:", error);
      }
    }
  };
  console.log(image);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Setting</CardTitle>
      </CardHeader>
      <CardContent>
        {image?.image ? (
          <img src={image?.image} />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image:</Label>
            <div>
              {image.image ? (
                <div className="text-green-500 text-xs">Image Uploaded</div>
              ) : isUploading ? (
                <div className="text-blue-500 text-xs">Uploading video...</div>
              ) : (
                <div className="text-red-500 text-xs">
                  Please select a image to upload
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
