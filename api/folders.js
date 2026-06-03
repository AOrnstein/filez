import { createFile } from "#db/queries/files";
import { getFolder, getFolders } from "#db/queries/folders";
import express from "express";
const router = express.Router();
export default router;

// get a list of all folders
router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found.");
  req.folder = folder;
  next();
});

// get a folder and its contained files by id
router.get("/:id", async (req, res) => {
  res.send(req.folder);
});

// create a new file in a folder
router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Missing request body");
  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send("Missing name or size field in body");
  const folder = req.folder;
  const file = await createFile({ name, size, folder });

  res.status(201).send(file);
});
