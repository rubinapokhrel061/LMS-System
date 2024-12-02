import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import {
  addLecture,
  updateLectureTitle,
  updateFreePreview,
  setVideoUrl,
  setIsUploading,
  replaceVideoUrl,
  deleteVideo,
} from "@/store/instructorSlice/courseCurriculumSlice";
import VideoPlayer from "@/components/media/VideoPlayer";
import { APIForMedia } from "@/http";

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

  // Function to check if form data is valid (both title and videoUrl)
  const isFormDataValid = () => {
    return courseCurriculum.every((item) => {
      return item && item.title.trim() !== "" && item.videoUrl.trim() !== "";
    });
  };

  const handleReplaceVideo = async (currentIndex) => {
    try {
      const currentVideo = courseCurriculum[currentIndex];

      if (currentVideo.public_id) {
        // Delete the current video first
        const deleteResponse = await handleDeleteVideo(
          currentIndex,
          currentVideo.public_id
        );

        // If delete successful, allow the user to upload a new video
        if (deleteResponse.success) {
          // Reset videoUrl and public_id in Redux
          dispatch(
            replaceVideoUrl({
              index: currentIndex,
              videoUrl: "",
              public_id: "",
            })
          );
        }
      } else {
        console.log("No video to replace. Please upload a video first.");
      }
    } catch (error) {
      console.error("Error replacing video:", error);
    } finally {
      dispatch(setIsUploading({ isUploading: false, index: null }));
    }
  };

  const handleDeleteVideo = async (index, publicId) => {
    try {
      const { data } = await APIForMedia.delete(`/media/delete/${publicId}`);
      if (data.success) {
        // Update Redux state to clear the video details
        dispatch(deleteVideo({ index }));
      }
      return data;
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button disabled={!isFormDataValid()} onClick={handleNewLecture}>
          Add Lecture
        </Button>
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
              <div>
                {index === uploadingIndex ? (
                  isUploading ? (
                    <div className="text-blue-500 text-xs mt-5">
                      Uploading video...
                    </div>
                  ) : (
                    ""
                  )
                ) : course.videoUrl ? (
                  <div className="flex flex-col gap-3">
                    <VideoPlayer url={course.videoUrl} />
                    <div className="flex justify-between w-[300px]">
                      <Button onClick={() => handleReplaceVideo(index)}>
                        Replace Video
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleDeleteVideo(index, course.public_id)
                        }
                      >
                        Delete Video
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <Label className="text-red-500 text-xs">
                      Please select a Video to upload
                    </Label>
                    <Input
                      type="file"
                      accept="video/*"
                      className="mb-4 "
                      onChange={(event) =>
                        handleSingleLectureUpload(event, index)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
