const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUser,
  updatePassword,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.patch("/user/update", auth, updateUser);
router.patch("/user/password", auth, updatePassword);

module.exports = router;
