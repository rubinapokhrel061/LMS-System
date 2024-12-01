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

const CourseLandingPage = () => {
  return (
    <Card className="shadow-sm shadow-green-300 border-none">
      <CardHeader>
        <CardTitle>Course Landing page</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="mb-4 ">
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              name="title"
              // onChange={handleChange}
              placeholder="Enter course title"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="category">Category:</Label>
            <Select type="text" name="category">
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
            <Select type="text" name="level">
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
            <Select type="text" name="primaryLanguage">
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
          <div className="mb-4 ">
            <Label htmlFor="subtitle">Subtitle:</Label>
            <Input
              type="text"
              name="subtitle"
              // onChange={handleChange}
              placeholder="Enter course subtitle"
              required
            />
          </div>
          <div className="mb-4 ">
            <Label htmlFor="price">Price:</Label>
            <Input
              type="number"
              name="price"
              // onChange={handleChange}
              placeholder="Enter course price"
              required
            />
          </div>
          <div className="mb-4 ">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              type="text"
              name="description"
              // onChange={handleChange}
              placeholder="Enter course description"
              required
            />
          </div>

          <div className="mb-4 ">
            <Label htmlFor="objectives">Objectives:</Label>
            <Textarea
              type="text"
              name="objectives"
              // onChange={handleChange}
              placeholder="Enter course objectives"
              required
            />
          </div>
          <div className="mb-4 ">
            <Label htmlFor="welcomeMessage">WelcomeMessage:</Label>
            <Textarea
              type="text"
              name="welcomeMessage"
              // onChange={handleChange}
              placeholder="Welcome message for Students"
              required
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseLandingPage;
