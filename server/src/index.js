import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend is working");
});
app.listen(8000, () => {
  console.log("Server has started at port 8000");
});
