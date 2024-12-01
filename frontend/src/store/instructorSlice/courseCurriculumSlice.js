//store/instructorSlice/courseCurriculumSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state structure
const initialState = {
  courseCurriculum: [
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
  ],
  isUploading: false, // Track if any upload is in progress
  uploadingIndex: null, // Track the index of the lecture being uploaded
};

// Create a slice for course curriculum
const courseCurriculumSlice = createSlice({
  name: "courseCurriculum",
  initialState,

  reducers: {
    addLecture(state) {
      state.courseCurriculum.push({
        title: "",
        videoUrl: "",
        freePreview: false,
        public_id: "",
      });
    },

    updateLectureTitle(state, action) {
      const { index, title } = action.payload;
      if (state.courseCurriculum[index]) {
        state.courseCurriculum[index].title = title;
      }
    },

    updateFreePreview(state, action) {
      const { index, freePreview } = action.payload;
      if (state.courseCurriculum[index]) {
        state.courseCurriculum[index].freePreview = freePreview;
      }
    },

    setVideoUrl(state, action) {
      const { index, videoUrl, public_id } = action.payload;
      if (state.courseCurriculum[index]) {
        state.courseCurriculum[index].videoUrl = videoUrl;
        state.courseCurriculum[index].public_id = public_id;
      }
      state.uploadingIndex = null; // Reset uploading index after the upload is complete
    },

    setIsUploading(state, action) {
      state.isUploading = action.payload.isUploading;
      if (action.payload.isUploading) {
        state.uploadingIndex = action.payload.index; // Set the index of the lecture being uploaded
      } else {
        state.uploadingIndex = null; // Reset uploading index when not uploading
      }
    },
  },
});

export const {
  addLecture,
  updateLectureTitle,
  updateFreePreview,
  setVideoUrl,
  setIsUploading,
} = courseCurriculumSlice.actions;

export default courseCurriculumSlice.reducer;
