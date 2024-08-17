const { Schema, model } = require("mongoose");

const STATUS_ORDER = [
  "INITIAL",
  "CONFIRMED",
  "DELIVERING",
  "DELIVERED",
  "CANCELED",
];

const orderSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: Object,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: STATUS_ORDER,
      default: "INITIAL",
    },
  },
  { timestamps: true }
);

const Order = model("orders", orderSchema);
module.exports = { STATUS_ORDER, Order };
