import { BarChart, Book, LogOut } from "lucide-react";
import React, { useState } from "react";
import InstructorDashboard from "../../components/instructor-view/dashboard/InstructorDashboard";

import InstructorCourses from "./InstructorCourses ";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { logout } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const InstructorLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-64 min-h-screen block ">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">LMS System</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "default" : "secondary"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value} key={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InstructorLayout;
