const AvailableBook = require("../models/availableBookModel");

const generateAvailableBooksForDay = (_date) => {
  const times = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];

  const _tables = [
    {
      _id: uuidv4(),
      name: "โต๊ะริมหน้าต่าง 1",
      capacity: 3,
      location: "indoor",
      isAvailable: true,
      image: imageToBase64(
        path.join(__dirname, "images/tables/table-window.jpeg")
      ),
    },
    {
      _id: uuidv4(),
      name: "โต๊ะริมหน้าต่าง 2",
      capacity: 4,
      location: "indoor",
      isAvailable: true,
      image: imageToBase64(
        path.join(__dirname, "images/tables/table-window.jpeg")
      ),
    },
    {
      _id: uuidv4(),
      name: "โต๊ะกลาง 1",
      capacity: 4,
      location: "indoor",
      isAvailable: true,
      image: imageToBase64(
        path.join(__dirname, "images/tables/table-center.jpg")
      ),
    },
    {
      _id: uuidv4(),
      name: "โต๊ะกลาง 2",
      capacity: 4,
      location: "indoor",
      isAvailable: true,
      image: imageToBase64(
        path.join(__dirname, "images/tables/table-center.jpg")
      ),
    },
    {
      _id: uuidv4(),
      name: "โต๊ะมุม 1",
      capacity: 6,
      location: "indoor",
      isAvailable: true,
      image: imageToBase64(
        path.join(__dirname, "images/tables/table-center.jpg")
      ),
    },
    {
      _id: uuidv4(),
      name: "โต๊ะมุม 2",
      capacity: 2,
      location: "indoor",
      isAvailable: true,
      image: imageToBase64(
        path.join(__dirname, "images/tables/table-center.jpg")
      ),
    },
  ];

  const timeSlots = [];
  const targetDate = _date ? new Date(_date) : new Date();

  const dateString = targetDate.toISOString().split("T")[0];

  const daySlots = {
    _id: uuidv4(),
    date: dateString,
    slots: times.map((time) => ({
      _id: uuidv4(),
      time,
      isAvailable: Math.random() > 0.3,
      tables: _tables.map((table) => ({
        ...table,
        _id: uuidv4(),
        isAvailable: Math.random() > 0.3,
      })),
    })),
  };

  timeSlots.push(daySlots);
  return timeSlots;
};
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

    let availableBook = await AvailableBook.findOne({ date });

    if (!availableBook) {
      const newAvailableBook = generateAvailableBooksForDay();
      availableBook = await AvailableBook.create(newAvailableBook);
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
