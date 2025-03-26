const Reservation = require("../models/reservationModel");
const AvailableBook = require("../models/availableBookModel");

const getReservationsByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { filter } = req.query;

    // Check if user is requesting their own reservations
    if (!userId) {
      return res.status(403).json({
        status: "error",
        message: "ไม่มีสิทธิ์เข้าถึงข้อมูลการจองของผู้ใช้อื่น",
      });
    }

    let query = { userId };
    if (filter === "today") {
      const today = new Date();
      today.setHours(today.getHours() + 7); // Convert to Thai timezone (UTC+7)
      const dateString = today.toISOString().split("T")[0];
      query.date = dateString;
    }
    console.log("query", query);

    // Find reservations based on query and sort by date
    const reservations = await Reservation.find(query)
      .sort({ date: -1, time: -1 })
      .lean();

    // If no reservations found
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({
        status: "error",
        message:
          filter === "today" ? "ไม่พบการจองสำหรับวันนี้" : "ไม่พบประวัติการจอง",
      });
    }

    // Get table details for each reservation
    const reservationsWithDetails = await Promise.all(
      reservations.map(async (reservation) => {
        const availableBook = await AvailableBook.findOne({
          date: reservation.date,
        });
        if (availableBook) {
          const timeSlot = availableBook.slots.find(
            (slot) => slot.time === reservation.time
          );
          if (timeSlot) {
            const table = timeSlot.tables.find(
              (table) => table._id === reservation.tableId
            );
            if (table) {
              return {
                ...reservation,
                tableDetails: {
                  name: table.name,
                  capacity: table.capacity,
                  location: table.location,
                  image: table.image,
                },
              };
            }
          }
        }
        return reservation;
      })
    );

    res.json({
      status: "success",
      data: {
        filter: filter || "all",
        count: reservationsWithDetails.length,
        reservations: reservationsWithDetails,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createReservation = async (req, res) => {
  try {
    const {
      date,
      time,
      numberOfGuests,
      tableId,
      specialOccasion,
      specialRequests,
    } = req.body;

    // Use userId from token instead of request body
    const userId = req.user.userId;

    // Validate required fields
    if (!date || !time || !numberOfGuests || !tableId) {
      return res.status(400).json({
        status: "error",
        message: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }

    // Check if table is available
    const availableBook = await AvailableBook.findOne({ date });
    if (!availableBook) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบตารางการจองในวันที่เลือก",
      });
    }

    // Find the specific time slot and table
    const timeSlot = availableBook.slots.find((slot) => slot.time === time);
    if (!timeSlot) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบช่วงเวลาที่เลือก",
      });
    }

    const table = timeSlot.tables.find((table) => table._id === tableId);
    if (!table) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบโต๊ะที่เลือก",
      });
    }

    if (!table.isAvailable) {
      return res.status(400).json({
        status: "error",
        message: "โต๊ะนี้ถูกจองแล้ว",
      });
    }

    // Create new reservation
    const newReservation = new Reservation({
      userId,
      date,
      time,
      numberOfGuests,
      tableId,
      specialOccasion: specialOccasion || "none",
      specialRequests: specialRequests || "",
      status: "pending",
    });

    // Save reservation
    const savedReservation = await newReservation.save();

    // Update table availability
    table.isAvailable = false;
    await availableBook.save();

    res.status(201).json({
      status: "success",
      data: {
        reservation: savedReservation,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    // Validate status
    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message:
          "สถานะไม่ถูกต้อง กรุณาระบุ: pending, confirmed, หรือ cancelled",
      });
    }

    // Find reservation
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบข้อมูลการจอง",
      });
    }

    // Check if user owns this reservation
    if (reservation.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "ไม่มีสิทธิ์แก้ไขการจองของผู้อื่น",
      });
    }

    // If cancelling, update table availability
    if (status === "cancelled") {
      const availableBook = await AvailableBook.findOne({
        date: reservation.date,
      });
      if (availableBook) {
        const timeSlot = availableBook.slots.find(
          (slot) => slot.time === reservation.time
        );
        if (timeSlot) {
          const table = timeSlot.tables.find(
            (table) => table._id === reservation.tableId
          );
          if (table) {
            table.isAvailable = true;
            await availableBook.save();
          }
        }
      }
    }

    // Update reservation status
    reservation.status = status;
    const updatedReservation = await reservation.save();

    // Get table details for response
    const availableBook = await AvailableBook.findOne({
      date: reservation.date,
    });
    let tableDetails = null;
    if (availableBook) {
      const timeSlot = availableBook.slots.find(
        (slot) => slot.time === reservation.time
      );
      if (timeSlot) {
        const table = timeSlot.tables.find(
          (table) => table._id === reservation.tableId
        );
        if (table) {
          tableDetails = {
            name: table.name,
            capacity: table.capacity,
            location: table.location,
            image: table.image,
          };
        }
      }
    }

    res.json({
      status: "success",
      data: {
        reservation: {
          ...updatedReservation.toObject(),
          tableDetails,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getReservationsByUserId,
  updateReservationStatus,
};
