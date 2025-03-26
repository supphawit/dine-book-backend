const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const menuSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4()
    },
    name: {
      type: String,
      required: [true, "กรุณาระบุชื่อสินค้า"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "กรุณาระบุรายละเอียดสินค้า"],
    },
    price: {
      type: Number,
      required: [true, "กรุณาระบุราคาสินค้า"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "กรุณาระบุหมวดหมู่สินค้า"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: [true, "กรุณาอัปโหลดภาพสินค้า"],
      validate: {
        validator: function (v) {
          return (
            v &&
            (v.startsWith("data:image/jpeg") || v.startsWith("data:image/webp"))
          );
        },
        message: "Image must be in Base64 format",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    _id: false
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
