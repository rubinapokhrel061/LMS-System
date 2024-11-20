//database/models/userModel.js
import sequelize from "../connection.js"; // Import Sequelize instance
import { DataTypes } from "sequelize"; // Import DataTypes from Sequelize

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
      allowNull: false, // Cannot be null
      unique: true, // Email must be unique
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cannot be null
    },
  }
  //   {
  //     tableName: "usernames", // Explicitly define the table name
  //   }
);

export default User;
