import { getFiles } from "#db/queries/files";
import express from "express";
const router = express.Router();
export default router;

// get a list of all filse
router.get("/", async (req, res) => {
  const files = await getFiles();
  res.send(files);
});
