const express = require("express");
const Product = require("../models/products");
const Variants = require("../models/variant");

const productRouter = express.Router();

// endpoint for getting all products data
productRouter.get("/allproducts", async (req, res) => {
  let products = await Product.find().exec();
  products = await Promise.all(
    products.map(async (it) => {
      const variants = await Variants.find({ category: it.category });

      return {
        ...it.toJSON(),
        variants,
      };
    })
  );
  console.log("All Products");
  res.send(products);
});

// endpoint for getting latest products data
productRouter.get("/newcollections", async (req, res) => {
  let products = await Product.find().exec();
  products = await Promise.all(
    products.map(async (it) => {
      const variants = await Variants.find({ category: it.category });

      return {
        ...it.toJSON(),
        variants,
      };
    })
  );
  let arr = products.slice(0).slice(-8);
  console.log("New Collections");
  res.send(arr);
});

// endpoint for getting womens products data
productRouter.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "Đèn" }).exec();
  products = await Promise.all(
    products.map(async (it) => {
      const variants = await Variants.find({ category: it.category });

      return {
        ...it.toJSON(),
        variants,
      };
    })
  );
  let arr = products.splice(0, 4);
  console.log("Popular In Women");
  res.send(arr);
});

// endpoint for getting womens products data
productRouter.post("/relatedproducts", async (req, res) => {
  console.log("Related Products");
  const { category } = req.body;
  let products = await Product.find({ category }).exec();
  products = await Promise.all(
    products.map(async (it) => {
      const variants = await Variants.find({ category: it.category });

      return {
        ...it.toJSON(),
        variants,
      };
    })
  );
  const arr = products.slice(0, 4);
  res.send(arr);
});

// Create an endpoint for adding products using admin panel
productRouter.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    category: req.body.category,
    // new_price: req.body.new_price,
    // old_price: req.body.old_price,
    content: req.body.content,
  });
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name });
});

// Create an endpoint for removing products using admin panel
productRouter.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name });
});

module.exports = productRouter;
