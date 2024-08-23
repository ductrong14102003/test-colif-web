const express = require("express");
const upload = require("../config/upload");

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.array("images"), (req, res) => {
  const images = req.files.map((it) => `/images/${it.filename}`);

  res.json({
    success: 1,
    images,
  });
});

module.exports = uploadRouter;
