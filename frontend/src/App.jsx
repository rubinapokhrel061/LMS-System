import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
import Unauthorized from "./pages/Unauthorized";
import StudentDashboard from "./pages/student/studentdashboard";
import InstructorDashboard from "./components/instructor-view/dashboard/InstructorDashboard";
import ProtectedRoute, { Role } from "./protected/ProtectedRoute";
import Profile from "./pages/student/profile";
import InstructorLayout from "./pages/instructor/InstructorLayout";
import CreateNewCourse from "./pages/instructor/CreateNewCourse";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute allowedRoles={[]}>
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRoute allowedRoles={[]}>
                  {" "}
                  {/* No roles allowed for register page */}
                  <Register />
                </ProtectedRoute>
              }
            />
            {/* Protected Route for Student */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={[Role.Student]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-profile"
              element={
                <ProtectedRoute allowedRoles={[Role.Student]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Protected Route for Instructor */}
            <Route
              path="/instructor"
              element={
                <ProtectedRoute allowedRoles={[Role.Instructor]}>
                  <InstructorLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/create-new-course"
              element={
                <ProtectedRoute allowedRoles={[Role.Instructor]}>
                  <CreateNewCourse />
                </ProtectedRoute>
              }
            />

            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
};

export default App;
