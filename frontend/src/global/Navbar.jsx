import { Button } from "@/components/ui/button";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
//  Navbar: Teal (#16A085) with white text/icons.
// Main Text: Charcoal (#2D3436)
// Secondary Text: Light Gray (#B2B2B2)
// Primary Buttons: Teal (#16A085) with white text (hover to Darker Teal).
// Secondary Buttons: Charcoal (#2D3436) with white text (hover to Light Gray).
// Links: Teal (#16A085), with hover effect to Lighter Teal.
const Navbar = () => {
  return (
    <nav className="relative px-4 py-3 bg-[#16A085] flex flex-col md:flex-row  justify-between md:justify-around items-center  border-b-2">
      <Link to="/" className="text-2xl text-white p-4 md:p-0 font-bold ">
        LMS LEARNING
      </Link>

      {/* Desktop Buttons */}
      <div className="flex gap-4">
        <div className="flex items-center mb-3 md:mb-0 relative">
          <input
            className="border-2 border-gray-300 pr-6 pl-3 py-2  rounded-lg text-sm focus:outline-none"
            type="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-2 ">
            <FiSearch className="text-[#16A085] hover:text-[#1ABC9C] h-4 w-4" />
          </button>
        </div>
        <div>
          <Link to="/login">
            <Button className="border-2">Sign In</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
