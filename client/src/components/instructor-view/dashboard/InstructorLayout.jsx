import { BarChart, Book, LogOut } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const InstructorLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      link: "/instructor/dashboard",
    },
    {
      icon: Book,
      label: "Courses",
      link: "/instructor/courses",
    },
    {
      icon: LogOut,
      label: "Logout",
      link: "",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-64 min-h-screen block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">LMS System</h2>
          <nav className="flex flex-col gap-2">
            {menuItems.map((menuItem) => (
              <div key={menuItem.label}>
                {menuItem.label === "Logout" ? (
                  <Button
                    onClick={handleLogout}
                    className="w-full justify-start mb-2"
                  >
                    <menuItem.icon className="mr-2 h-4 w-4" />
                    {menuItem.label}
                  </Button>
                ) : (
                  <NavLink
                    to={menuItem.link}
                    className={({ isActive }) =>
                      `w-full justify-start mb-2  px-4 py-2 rounded-md flex items-center ${
                        isActive ? "bg-secondary " : "bg-transparent"
                      }`
                    }
                  >
                    <menuItem.icon className="mr-2 h-4 w-4" />
                    {menuItem.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default InstructorLayout;
