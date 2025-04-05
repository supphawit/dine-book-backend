const mongoose = require("mongoose");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const {
  mockUsers,
  mockMenus,
  mockAvailableBooks,
  mockReviews,
} = require("./mockData");
const User = require("../models/userModel");
const Menu = require("../models/menuModel");
const AvailableBook = require("../models/availableBookModel");
const Review = require("../models/reviewModel");
const Reservation = require("../models/reservationModel");

const SALT_ROUNDS = 10;

async function runMigration() {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.error("MongoDB Connection Error:", err));

    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Menu.deleteMany({});
    await AvailableBook.deleteMany({});
    await Review.deleteMany({});
    await Reservation.deleteMany({});
    console.log(
      "Cleared existing users, menus, available books, reservations and reviews"
    );

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      mockUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Created ${createdUsers.length} users:`);
    createdUsers.forEach((user) => {
      console.log(`- ${user.firstname} ${user.lastname} (${user.email})`);
    });

    // Create menus with images
    const createdMenus = await Menu.insertMany(mockMenus);
    console.log(`Created ${createdMenus.length} menus:`);
    createdMenus.forEach((menu) => {
      console.log(`- ${menu.name} (${menu.category}) - ฿${menu.price}`);
      // Verify image was uploaded
      if (menu.image) {
        console.log(`  Image uploaded successfully`);
      }
    });

    // Create available books
    const createdAvailableBooks = await AvailableBook.insertMany(
      mockAvailableBooks
    );
    console.log(
      `Created available books for ${createdAvailableBooks.length} days`
    );
    createdAvailableBooks.forEach((book) => {
      console.log(`- Date: ${book.date} (${book.slots.length} time slots)`);
    });

    // Create reviews
    const createdReviews = await Review.insertMany(mockReviews);
    console.log(`Created ${createdReviews.length} reviews:`);
    createdReviews.forEach((review) => {
      console.log(
        `- Rating: ${review.overallRating} (${review.reviewedMenus.length} menus reviewed)`
      );
    });

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

runMigration();
