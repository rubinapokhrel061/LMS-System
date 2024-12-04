import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import Curriculum from "./curriculumModel.js";
import Student from "./studentModel.js";

const Course = sequelize.define(
  "Course",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    instructorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primaryLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    welcomeMessage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pricing: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    objectives: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Course.hasMany(Curriculum, { foreignKey: "courseId" });
Curriculum.belongsTo(Course, { foreignKey: "courseId" });

Course.hasMany(Student, { foreignKey: "courseId" });
Student.belongsTo(Course, { foreignKey: "courseId" });

export default Course;
