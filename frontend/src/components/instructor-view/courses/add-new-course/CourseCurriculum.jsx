import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const CourseCurriculum = () => {
  const courseCurriculum = [
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Add Lecture</Button>
        <div className="mt-4 space-y-4">
          {courseCurriculum.map((courseCurriculum, index) => (
            <>
              <div className="border p-5 rounded-md">
                <div className="flex gap-5 items-center">
                  <h3 className="font-semibold">Lecture {index + 1}</h3>
                  <Input
                    name={`title-${index + 1}`}
                    placeholder="Enter lecture title"
                    className="max-w-96"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch checked={true} id={`freepreview-${index + 1}`} />
                    <Label htmlFor={`freepreview-${index + 1}`}>
                      Free Preview
                    </Label>
                  </div>
                </div>
                <div className="mt-6">
                  <Input type="file" accept="video/*" className="mb-4" />
                </div>
              </div>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
