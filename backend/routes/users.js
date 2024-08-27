const express = require("express");
const Users = require("../models/users");
const fetchuser = require("../middlewares/fetchUser");

const userRouter = express.Router();

// Create an endpoint for saving the product in cart
userRouter.post("/addtocart", fetchuser, async (req, res) => {
  const { productId, variantId } = req.body;
  const userData = await Users.findOne({ _id: req.user.id }).exec();
  let carts = userData.cartData;

  const findProduct = carts.find(
    (it) =>
      it.product.toString() === productId && it.variant.toString() === variantId
  );

  if (findProduct) {
    carts = carts.map((it) =>
      it._id === findProduct._id
        ? { ...findProduct, quantity: it.quantity + 1 }
        : it
    );
  } else {
    carts.push({
      product: productId,
      variant: variantId,
      quantity: 1,
    });
  }

  userData.cartData = carts;
  await userData.save();

  res.json(true);
});

// Create an endpoint for removing the product in cart
userRouter.post("/removefromcart", fetchuser, async (req, res) => {
  const id = req.body.id;

  let userData = await Users.findOne({ _id: req.user.id }).exec();

  const newCarts = userData.cartData.filter((it) => it._id.toString() !== id);
  userData.cartData = newCarts;
  await userData.save();

  res.json(true);
});

// Create an endpoint for getting cartdata of user
userRouter.post("/getcart", fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id })
    .populate({
      path: "cartData.product",
      model: "Product",
    })
    .populate({
      path: "cartData.variant",
      model: "Variants",
    });
  res.json(userData.cartData);
});

module.exports = userRouter;
