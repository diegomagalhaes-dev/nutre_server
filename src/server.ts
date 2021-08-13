import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Workout hour!" });
});

app.listen(3332, () => {
  console.log("Server started on port 3332");
});
