const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const tableSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: ["indoor", "outdoor"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const slotSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    time: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tables: [tableSchema],
  },
  {
    _id: false,
  }
);

const availableBookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    date: {
      type: String,
      required: true,
    },
    slots: [slotSchema],
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Add index for faster date queries
availableBookSchema.index({ date: 1 });

module.exports = mongoose.model("AvailableBook", availableBookSchema);
