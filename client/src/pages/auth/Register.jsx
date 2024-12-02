import React, { useEffect } from "react";
import Form from "../../components/commonForm/Form";
import { register, resetStatus } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "@/global/Status";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const handleRegister = async (data) => {
    dispatch(register(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/login");
    }
  }, [status, navigate, dispatch]);
  return <Form type="register" onSubmit={handleRegister} />;
};

export default Register;
