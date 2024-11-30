import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { APIForMedia } from "@/http";
import React, { useState } from "react";

const CourseCurriculum = () => {
  const courseCurriculum = [
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
  ];

  const [courseCurriculumFormData, setCourseCurriculumFormData] =
    useState(courseCurriculum);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        title: "",
        videoUrl: "",
        freePreview: false,
        public_id: "",
      },
    ]);
  }

  // Handle course title change
  const handleCourseTitleChange = (event, currentIndex) => {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  };

  // Handle free preview switch
  const handleFreePreviewChange = (currentValue, currentIndex) => {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  };

  // Handle file upload and update video URL
  const handleSingleLectureUpload = async (event, currentIndex) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      let videoData = new FormData();
      videoData.append("file", selectedFile);

      try {
        const response = await APIForMedia.post("media/upload", videoData);

        if (response?.data?.data?.url) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.data?.url,
            public_id: response?.data?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
        }
      } catch (error) {
        // Handle error (e.g., alert user, show a message, etc.)
      }
    }
  };
  console.log(courseCurriculumFormData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lecture</Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((courseCurriculum, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculum.freePreview}
                    id={`freepreview-${index + 1}`}
                  />
                  <Label htmlFor={`freepreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                <Input
                  type="file"
                  accept="video/*"
                  className="mb-4"
                  onChange={(event) => handleSingleLectureUpload(event, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
