const express = require("express");

const { Order } = require("../models/orders");
const fetchuser = require("../middlewares/fetchUser");
const Users = require("../models/users");

const orderRouter = express.Router();

orderRouter.post("/orders", fetchuser, async (req, res) => {
  try {
    const user = req.user.id;
    const {
      customerName,
      customerPhone,
      customerEmail,
      address,
      message,
      totalPrice,
    } = req.body;

    const carts = await Users.findById(user)
      .populate({
        path: "cartData.product",
        model: "Product",
      })
      .populate({
        path: "cartData.variant",
        model: "Variants",
      })
      .exec();

    const orderCreated = await new Order({
      customerName,
      customerPhone,
      customerEmail,
      address,
      message,
      totalPrice,
      products: carts.cartData,
      orderBy: user,
    }).save();

    // remove cart
    await Users.findByIdAndUpdate(user, { cartData: [] }).exec();

    res.json({
      status: true,
      data: orderCreated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error?.message,
    });
  }
});

orderRouter.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort("-createdAt").exec();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error?.message,
    });
  }
});

module.exports = orderRouter;
