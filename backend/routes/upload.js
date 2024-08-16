const express = require("express");
const upload = require("../config/upload");

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`,
  });
});

module.exports = uploadRouter;
