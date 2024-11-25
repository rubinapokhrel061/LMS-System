import React, { useEffect } from "react";
import Form from "./component/Form";
import { useDispatch, useSelector } from "react-redux";

import { Status } from "@/global/Status";
import { useNavigate } from "react-router-dom";
import { login, resetStatus } from "@/store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const handleLogin = async (data) => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/");
    }
  }, [status, navigate, dispatch]);

  return (
    <>
      <Form type="login" onSubmit={handleLogin} />
    </>
  );
};

export default Login;
