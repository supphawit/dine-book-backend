const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SALT_ROUNDS = 10;

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !phone || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already registered",
      });
    }

    // Create new user
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      status: "success",
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      status: "success",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateFields = req.body;

    delete updateFields.email;

    // Validate phone format if provided
    if (updateFields.phone) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(updateFields.phone)) {
        return res.status(400).json({
          status: "error",
          message: "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบข้อมูลผู้ใช้",
      });
    }

    res.json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { current_password, new_password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบข้อมูลผู้ใช้",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      current_password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "รหัสผ่านปัจจุบันไม่ถูกต้อง",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(new_password, salt);

    user.password = hashedNewPassword;
    await user.save();

    res.json({
      status: "success",
      message: "เปลี่ยนรหัสผ่านสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  updatePassword,
};
