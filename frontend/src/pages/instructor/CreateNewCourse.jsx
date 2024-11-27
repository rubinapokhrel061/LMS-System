import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const CreateNewCourse = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-5">Create a New Course</h1>
        <Button>SUBMIT</Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNewCourse;
