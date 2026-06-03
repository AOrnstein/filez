import express from "express";
import foldersRouter from "#api/folders";
import filesRouter from "#api/files";
const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Routers
app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});
