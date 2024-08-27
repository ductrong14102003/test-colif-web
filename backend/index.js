const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/connectDB");

const uploadRouter = require("./routes/upload");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const Variants = require("./models/variant");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
connectDB();

// routes
app.use("/", uploadRouter);
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", orderRouter);

app.post("/variants", async (req, res) => {
  const variant = await new Variants(req.body).save();
  res.json(variant);
});

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
