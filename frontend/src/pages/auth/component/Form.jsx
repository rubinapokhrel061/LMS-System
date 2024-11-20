import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/global/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ type }) => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto min-h-[75vh] md:min-h-[90vh]  flex flex-col items-center  justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-4 md:p-8 rounded-lg shadow-md shadow-[#16A085]">
          <header className="mb-6 text-center ">
            <h2 className="text-2xl font-semibold text-[#16A085]">
              {type === "register" ? "Create Your Account" : "Welcome Back!"}
            </h2>
            <h3 className="text-sm font-medium pt-3 ">
              {type === "register"
                ? "Sign up to get started"
                : "Sign in to access your dashboard"}
            </h3>
          </header>

          <form autoComplete="off">
            {/* Conditional Fields for Registration */}
            {type === "register" && (
              <>
                <div className="mb-4">
                  <Label htmlFor="username">Enter User Name:</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Rubina20"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    label="Username"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="phonenumber">Enter Phone Number:</Label>
                  <Input
                    type="text"
                    name="phonenumber"
                    onChange={handleChange}
                    placeholder="9862122600"
                    required
                    autoComplete="off"
                    label="Phone Number"
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <Label htmlFor="email">Enter Email:</Label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="rubina20@gmail.com"
                required
                autoComplete="off"
                label="Email Address"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="username">Enter Password:</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="********"
                required
                autoComplete="off"
                label="Password"
              />
            </div>

            <Button type="submit">
              {type === "register" ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          {/* Conditional Link for Registration or Login */}
          <div className="mt-4 text-center text-sm">
            {type === "register" ? (
              <>
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-[#16A085] hover:text-[#1ABC9C]"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#16A085] hover:text-[#1ABC9C]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Form;
