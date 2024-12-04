//database/models/userModel.js
import sequelize from "../connection.js";
import { DataTypes } from "sequelize";

// Define the User model
const User = sequelize.define(
  "User",
  {
    // 'User' is the model name
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Default to UUID version 4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Cannot be null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      message: "Email must be unique",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "instructor"),
      defaultValue: "student",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
