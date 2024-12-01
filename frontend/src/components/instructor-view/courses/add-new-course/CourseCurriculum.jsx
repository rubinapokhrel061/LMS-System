import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { APIForMedia } from "@/http";
import {
  addLecture,
  updateLectureTitle,
  updateFreePreview,
  setVideoUrl,
  setIsUploading,
} from "@/store/instructorSlice/courseCurriculumSlice";

const CourseCurriculum = () => {
  const dispatch = useDispatch();
  const { courseCurriculum, isUploading, uploadingIndex } = useSelector(
    (state) => state.courseCurriculum
  );

  const handleNewLecture = () => {
    dispatch(addLecture());
  };

  const handleCourseTitleChange = (event, index) => {
    dispatch(updateLectureTitle({ index, title: event.target.value }));
  };

  const handleFreePreviewChange = (value, index) => {
    dispatch(updateFreePreview({ index, freePreview: value }));
  };

  const handleSingleLectureUpload = async (event, index) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      let videoData = new FormData();
      videoData.append("file", selectedFile);

      try {
        dispatch(setIsUploading({ isUploading: true, index }));

        const response = await APIForMedia.post("media/upload", videoData);

        if (response.data.success && response.data.data.url) {
          dispatch(
            setVideoUrl({
              index,
              videoUrl: response.data.data.url,
              public_id: response.data.data.public_id,
            })
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsUploading({ isUploading: false, index: null }));
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lecture</Button>
        <div className="mt-4 space-y-4">
          {courseCurriculum.map((course, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={course.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={course.freePreview}
                    id={`freepreview-${index + 1}`}
                  />
                  <Label htmlFor={`freepreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                {index === uploadingIndex ? (
                  isUploading ? (
                    <div className="text-blue-500 text-xs">
                      Uploading video...
                    </div>
                  ) : (
                    <div className="text-red-500 text-xs">
                      Please select a file to upload
                    </div>
                  )
                ) : course.videoUrl ? (
                  <div className="text-green-500 text-xs">Video Uploaded</div>
                ) : null}

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
