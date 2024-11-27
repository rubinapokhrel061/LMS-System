import { Button } from "@/components/ui/button";
import { logout } from "@/store/authSlice";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//  Navbar: Teal (#16A085) with white text/icons.
// Main Text: Charcoal (#2D3436)
// Secondary Text: Light Gray (#B2B2B2)
// Primary Buttons: Teal (#16A085) with white text (hover to Darker Teal).
// Secondary Buttons: Charcoal (#2D3436) with white text (hover to Light Gray).
// Links: Teal (#16A085), with hover effect to Lighter Teal.

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token || !!user?.token);
  }, [user?.token]);

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
  };

  return (
    <nav className="relative px-4 py-3 bg-[#16A085] flex flex-col md:flex-row justify-between md:justify-around items-center border-b-2">
      <Link to="/" className="text-2xl text-white p-4 md:p-0 font-bold">
        LMS LEARNING
      </Link>

      <div className="flex gap-4">
        <div className="flex items-center mb-3 md:mb-0 relative">
          <input
            className="border-2 border-gray-300 pr-6 pl-3 py-2 rounded-lg text-sm focus:outline-none"
            type="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-2 ">
            <FiSearch className="text-[#16A085] hover:text-[#1ABC9C] h-4 w-4" />
          </button>
        </div>
        {!isLoggedIn ? (
          <div>
            <Link to="/login">
              <Button className="border-2">Sign In</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/" onClick={handleLogout}>
              <Button className="border-2">LogOut</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
