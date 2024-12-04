import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormField } from "@/store/instructorSlice/courseSettingSlice"; // Import updateFormField action

const CourseLandingPage = () => {
  const { formData } = useSelector((state) => state.courseLanding);
  const dispatch = useDispatch();

  // Handle input changes and update the Redux state
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name, value }));
  };

  // Handle select changes separately
  const handleSelectChange = (field) => (value) => {
    dispatch(updateFormField({ field, value }));
  };

  return (
    <Card className="shadow-sm shadow-green-300 border-none">
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="mb-4">
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="category">Category:</Label>
            <Select
              name="category"
              value={formData.category}
              onValueChange={handleSelectChange("category")} // use onValueChange for Select
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="mobile-development">
                    Mobile development
                  </SelectItem>
                  <SelectItem value="web-development">
                    Web development
                  </SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="machine-learning">
                    Machine learning
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="level">Level:</Label>
            <Select
              name="level"
              value={formData.level}
              onValueChange={handleSelectChange("level")} // use onValueChange for Select
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="primaryLanguage">Primary Language:</Label>
            <Select
              name="primaryLanguage"
              value={formData.primaryLanguage}
              onValueChange={handleSelectChange("primaryLanguage")} // use onValueChange for Select
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Primary Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="nepali">Nepali</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="subtitle">Subtitle:</Label>
            <Input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter course subtitle"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="pricing">Price:</Label>
            <Input
              type="number"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              placeholder="Enter course price"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="objectives">Objectives:</Label>
            <Textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              placeholder="Enter course objectives"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="welcomeMessage">Welcome Message:</Label>
            <Textarea
              name="welcomeMessage"
              value={formData.welcomeMessage}
              onChange={handleChange}
              placeholder="Welcome message for students"
              required
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseLandingPage;
