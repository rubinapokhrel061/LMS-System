import express from "express";
import * as dotenv from "dotenv";
//database connection
import "./database/connection.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import instructorSeeder from "./InstructorSeeder.js";
dotenv.config();
const app = express();
app.use(express.json());
instructorSeeder();
app.use(
  cors({
    origin: "*",
  })
);
//routes
app.use("/", userRoute);

app.get("/", (req, res) => {
  res.send("Backend is working");
});
app.listen(process.env.PORT, () => {
  console.log(`Server has started at port ${process.env.PORT}`);
});
