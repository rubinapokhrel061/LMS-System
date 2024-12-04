import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/CourseCurriculum";
import CourseLandingPage from "@/components/instructor-view/courses/add-new-course/CourseLandingPage";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/CourseSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API } from "@/http";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateNewCourse = () => {
  const courseLanding = useSelector((state) => state.courseLanding.formData);
  const courseCurriculum = useSelector(
    (state) => state.courseCurriculum.courseCurriculum
  );
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    instructorId: localStorage.getItem("userid"),
    instructorName: localStorage.getItem("username"),
    date: new Date().toISOString(),
    ...courseLanding,
    curriculum: courseCurriculum,
    isPublished: false,
  });

  useEffect(() => {
    setCourseData({
      ...courseLanding,
      instructorId: localStorage.getItem("userid"),
      instructorName: localStorage.getItem("username"),
      date: courseData.date,
      curriculum: courseCurriculum,
      isPublished: courseData.isPublished,
    });
  }, [courseLanding, courseCurriculum]);

  const isFormValid = () => {
    const requiredFields = [
      "title",
      "category",
      "level",
      "primaryLanguage",
      "subtitle",
      "description",
      "image",
      "pricing",
      "objectives",
    ];

    const isAllFieldsFilled = requiredFields.every(
      (field) => courseData[field].trim() !== ""
    );

    const isCurriculumValid =
      courseData.curriculum.length > 0 &&
      courseData.curriculum.every((lecture) => lecture.title.trim() !== "");

    return isAllFieldsFilled && isCurriculumValid;
  };

  const handleFormSubmit = async () => {
    if (isFormValid()) {
      const courseSubmissionData = {
        instructorId: courseData.instructorId,
        instructorName: courseData.instructorName,
        date: courseData.date,
        title: courseData.title,
        category: courseData.category,
        level: courseData.level,
        primaryLanguage: courseData.primaryLanguage,
        subtitle: courseData.subtitle,
        description: courseData.description,
        date: courseData.date,
        image: courseData.image,
        welcomeMessage: courseData.welcomeMessage,
        pricing: courseData.pricing,
        objectives: courseData.objectives,
        students: courseData.students,
        curriculum: courseData.curriculum,
        isPublished: courseData.isPublished,
      };

      try {
        const response = await API.post("api/courses", courseSubmissionData);

        if (response) {
          navigate("/instructor/courses");
          toast.success("Course created successfully");
          console.log("Course submitted successfully:", response);
        } else {
          console.error("Error submitting course:", response.statusText);
        }
      } catch (error) {
        console.error("Error making API request:", error);
      }
    } else {
      console.log("Form is not valid. Please fill in all required fields.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-5">Create a New Course</h1>
        <Button onClick={handleFormSubmit} disabled={!isFormValid()}>
          SUBMIT
        </Button>
      </div>
      <Card className="shadow-sm shadow-green-300 border-none">
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList className="bg-green-300">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLandingPage />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNewCourse;
