import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import courseCurriculumSlice from "./instructorSlice/courseCurriculumSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    courseCurriculum: courseCurriculumSlice,
  },
});

export default store;
