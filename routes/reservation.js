const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getReservationsByUserId,
  createReservation,
  updateReservationStatus,
} = require("../controllers/reservationController");
const {
  getAvailableBooksByDate,
} = require("../controllers/availableBookController");

// Protect all reservation routes with auth middleware
router.get("/", auth, getReservationsByUserId);
router.get("/getAvailableBooks", auth, getAvailableBooksByDate);

router.post("/create", auth, createReservation);

// Update reservation status
router.patch("/:reservationId/status", auth, updateReservationStatus);

module.exports = router;
