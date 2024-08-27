const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variants",
        required: true,
      },
    },
  ],
  date: { type: Date, default: Date.now() },
});

module.exports = Users;
