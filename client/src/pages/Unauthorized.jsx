import React from "react";
import { Navigate } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h2>You do not have permission to access this page.</h2>
      <Navigate to="/login" />
    </div>
  );
};

export default Unauthorized;
