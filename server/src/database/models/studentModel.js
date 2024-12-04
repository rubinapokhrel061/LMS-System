import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Student = sequelize.define(
  "Student",
  {
    studentId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    paidAmount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Student;
