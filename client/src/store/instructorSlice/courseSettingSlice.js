//store/instructorSlice/courseSettingSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the course form
const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

const initialState = {
  formData: { ...courseLandingInitialFormData },
  isUploading: false,
};

const courseLandingSlice = createSlice({
  name: "courseLanding",
  initialState,

  reducers: {
    // Set image URL
    setImage(state, action) {
      state.formData.image = action.payload;
    },

    // Set uploading status
    setIsUploading(state, action) {
      state.isUploading = action.payload;
    },

    // Reset form data
    resetForm(state) {
      state.formData = { ...courseLandingInitialFormData };
    },

    // Update other form fields
    updateFormField(state, action) {
      const { field, value } = action.payload;
      if (state.formData.hasOwnProperty(field)) {
        state.formData[field] = value;
      }
    },
  },
});

export const { setImage, setIsUploading, resetForm, updateFormField } =
  courseLandingSlice.actions;

export default courseLandingSlice.reducer;
