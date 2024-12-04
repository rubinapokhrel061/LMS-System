import Course from "../../database/models/courseModel.js";
import Curriculum from "../../database/models/curriculumModel.js";
import Student from "../../database/models/studentModel.js";

// Create Course
export const createCourse = async (req, res) => {
  try {
    const {
      instructorId,
      instructorName,
      date,
      title,
      category,
      level,
      primaryLanguage,
      subtitle,
      description,
      image,
      welcomeMessage,
      pricing,
      objectives,
      students,
      curriculum,
      isPublished,
    } = req.body;
    // if (
    //   !instructorId ||
    //   !instructorName ||
    //   !title ||
    //   !category ||
    //   !level ||
    //   !primaryLanguage ||
    //   !subtitle ||
    //   !description ||
    //   !image ||
    //   !welcomeMessage ||
    //   !pricing ||
    //   !objectives ||
    //   !isPublished
    // ) {
    //   return res.status(400).json({
    //     message: "Please provide all Course datails",
    //   });
    // }

    // Create a new course
    const course = await Course.create({
      instructorId,
      instructorName,
      date,
      title,
      category,
      level,
      primaryLanguage,
      subtitle,
      description,
      image,
      welcomeMessage,
      pricing,
      objectives,
      isPublished,
    });

    // Handle students (if there are any students in the request body)
    if (students && students.length > 0) {
      await Promise.all(
        students.map((student) =>
          Student.create({
            studentId: student.studentId,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
            paidAmount: student.paidAmount,
            courseId: course.id,
          })
        )
      );
    }

    // Handle curriculum (if there are any curriculum items in the request body)
    if (curriculum && curriculum.length > 0) {
      await Promise.all(
        curriculum.map((lecture) =>
          Curriculum.create({
            title: lecture.title,
            videoUrl: lecture.videoUrl,
            public_id: lecture.public_id,
            freePreview: lecture.freePreview,
            courseId: course.id,
          })
        )
      );
    }

    // Fetch the course along with the associated students and curriculum
    const createdCourse = await Course.findOne({
      where: { id: course.id },
      include: [Student, Curriculum],
    });

    // Send the response
    return res.status(201).json({
      success: true,
      data: createdCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ message: "Error creating course" });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [Student, Curriculum],
    });
    if (courses.length < 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Error fetching courses" });
  }
};

// Get a course by ID
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findOne({
      where: { id: courseId },
      include: [Student, Curriculum],
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return res.status(500).json({ message: "Error fetching course" });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const {
      instructorId,
      instructorName,
      date,
      title,
      category,
      level,
      primaryLanguage,
      subtitle,
      description,
      image,
      welcomeMessage,
      pricing,
      objectives,
      isPublished,
    } = req.body;

    const course = await Course.findOne({ where: { id: courseId } });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.update({
      instructorId,
      instructorName,
      date,
      title,
      category,
      level,
      primaryLanguage,
      subtitle,
      description,
      image,
      welcomeMessage,
      pricing,
      objectives,
      isPublished,
    });

    return res.status(200).json({
      message: "Please provide email..",
      data: Course,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Error updating course" });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findOne({ where: { id: courseId } });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.destroy();

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting course" });
  }
};
