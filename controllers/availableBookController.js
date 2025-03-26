const AvailableBook = require("../models/availableBookModel");

const getAvailableBooksByDate = async (req, res) => {
  try {
    const { date } = req.query;

    const userId = req.user.userId;

    if (!userId) {
      return res.status(403).json({
        status: "error",
        message: "ไม่มีสิทธิ์เข้าถึงข้อมูลการจองของผู้ใช้อื่น",
      });
    }

    if (!date) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a date",
      });
    }

    const availableBook = await AvailableBook.findOne({ date });

    if (!availableBook) {
      return res.status(404).json({
        status: "error",
        message: "No available bookings found for this date",
      });
    }

    res.json({
      status: "success",
      data: availableBook,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAvailableBooksByDate,
};
