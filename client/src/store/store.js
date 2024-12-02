import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import courseCurriculumSlice from "./instructorSlice/courseCurriculumSlice";
import courseLandingSlice from "./instructorSlice/courseSettingSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    courseCurriculum: courseCurriculumSlice,
    courseLanding: courseLandingSlice,
  },
});

export default store;
