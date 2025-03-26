const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const reservationSchema = new mongoose.Schema(
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
    date: {
      type: String,
      required: [true, "กรุณาระบุวันที่จอง"],
    },
    time: {
      type: String,
      required: [true, "กรุณาระบุเวลาที่จอง"],
    },
    numberOfGuests: {
      type: Number,
      required: [true, "กรุณาระบุจำนวนแขก"],
      min: [1, "จำนวนแขกต้องมากกว่า 0"],
      max: [20, "จำนวนแขกต้องไม่เกิน 20 คน"],
    },
    tableId: {
      type: String,
      required: [true, "กรุณาเลือกโต๊ะ"],
      ref: "AvailableBook",
    },
    specialOccasion: {
      type: String,
      enum: [
        "birthday",
        "anniversary",
        "graduation",
        "business",
        "datenight",
        "other",
        "none",
      ],
      default: "none",
    },
    specialRequests: {
      type: String,
      maxLength: [500, "ความต้องการพิเศษต้องไม่เกิน 500 ตัวอักษร"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Add indices for faster queries
reservationSchema.index({ userId: 1, date: 1 });
reservationSchema.index({ date: 1, time: 1 });
reservationSchema.index({ status: 1 });

module.exports = mongoose.model("Reservation", reservationSchema);
