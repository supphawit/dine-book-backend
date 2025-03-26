const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const reviewedMenuSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  menuId: {
    type: String,
    required: true,
    ref: "Menu",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxLength: 500,
  },
});

const reviewSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    overallRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return (
              v &&
              (v.startsWith("data:image/jpeg") ||
                v.startsWith("data:image/webp"))
            );
          },
          message: "Image must be in Base64 format",
        },
      },
    ],
    reviewedMenus: [reviewedMenuSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
