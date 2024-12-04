//database/connection.js

import { Sequelize } from "sequelize";
import "dotenv/config";

// Initialize Sequelize with the environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,

    dialect: "mysql",

    logging: console.log,
  }
);
// // Sync Sequelize models with the database (do not drop existing tables)
// sequelize.sync({ force: false }).then(() => {
//   console.log("Tables synced!");
// });
// Authenticate the database connection

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Sync Sequelize models with the database (force: true will drop and recreate tables)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables synced!");
  })
  .catch((err) => {
    console.error("Error syncing tables:", err);
  });

export default sequelize;
