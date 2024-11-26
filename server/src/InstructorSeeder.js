import User from "./database/models/userModel.js";
import bcrypt from "bcrypt";

const instructorSeeder = async () => {
  try {
    const [data] = await User.findAll({
      where: {
        email: "instructorrubina@gmail.com",
      },
    });

    if (!data) {
      await User.create({
        email: "instructorrubina@gmail.com",
        password: bcrypt.hashSync("instructorrubina", 8),
        username: "instructor-rubina",
        role: "instructor",
      });
      console.log("Instructor credentials seeded successfully");
    } else {
      console.log("Instructor credentials already seeded", data);
    }
  } catch (error) {
    console.error("Error seeding instructor credentials:", error);
  }
};

export default instructorSeeder;
