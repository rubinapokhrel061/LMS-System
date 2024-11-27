import React, { useEffect } from "react";
import Form from "./component/Form";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "@/global/Status";
import { useNavigate } from "react-router-dom";
import { login, resetStatus } from "@/store/authSlice";
import { Role } from "@/protected/ProtectedRoute";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, token, role } = useSelector((state) => state.auth);

  const handleLogin = async (data) => {
    dispatch(login(data)); // Dispatch login action with form data
  };

  useEffect(() => {
    if (status === Status.SUCCESS && token) {
      dispatch(resetStatus()); // Reset status after login

      // Navigate based on user role after successful login
      if (role === Role.Student) {
        navigate("/student");
      } else if (role === Role.Instructor) {
        navigate("/instructor");
      }
    }
  }, [status, token, role, navigate, dispatch]);

  return (
    <>
      <Form type="login" onSubmit={handleLogin} />
    </>
  );
};

export default Login;
