import { Navigate } from "react-router-dom";

export const Role = {
  Student: "student",
  Instructor: "instructor",
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (token) {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      if (userRole === Role.Student) {
        return <Navigate to="/student" />;
      }
      if (userRole === Role.Instructor) {
        return <Navigate to="/instructor/dashboard" />;
      }
    }
  }

  if (!token) {
    return <>{children}</>;
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
