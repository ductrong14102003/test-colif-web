const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/connectDB");

const uploadRouter = require("./routes/upload");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
connectDB();

// routes
app.use("/", uploadRouter);
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", productRouter);

// Route for Images folder
app.use("/images", express.static("upload/images"));

// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});

const PORT = process.env.PORT || 4000;

// Starting Express Server
app.listen(PORT, (error) => {
  if (!error) console.log("Server Running on port " + PORT);
  else console.log("Error : ", error);
});
