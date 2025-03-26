const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    firstname: {
      type: String,
      required: [true, "กรุณาระบุชื่อ"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "กรุณาระบุนามสกุล"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "กรุณาระบุอีเมล"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "กรุณาระบุเบอร์โทรศัพท์"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "กรุณาระบุรหัสผ่าน"],
      minlength: 6,
    },
    image: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || v.startsWith("data:image/");
        },
        message: "Image must be in Base64 format",
      },
    },
    birthdate: {
      type: Date,
    },
    email_noti: {
      type: Boolean,
      default: true,
    },
    sms_noti: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    _id: false, // Disable auto-generated ObjectID
  }
);

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 8);
//   next();
// });

module.exports = mongoose.model("User", userSchema);
