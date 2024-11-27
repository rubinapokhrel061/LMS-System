import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const InstructorCourses = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-2xl font-bold">All Courses</CardTitle>
          <Button
            onClick={() => navigate("/instructor/create-new-course")}
            className=""
          >
            Create New Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">React</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>Rs.5000</TableCell>
                  <TableCell className="flex gap-1">
                    <Button className="p-2" variant="outline">
                      <Edit className="text-green-600  " />
                    </Button>
                    <Button className="p-2" variant="outline">
                      <Delete className="text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>{" "}
    </>
  );
};

export default InstructorCourses;
