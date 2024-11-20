import express from "express";
import * as dotenv from "dotenv";
//database connection
import "./database/connection.js";
import User from "./database/models/userModel.js";
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Backend is working");
});
app.listen(process.env.PORT, () => {
  console.log(`Server has started at port ${process.env.PORT}`);
});
