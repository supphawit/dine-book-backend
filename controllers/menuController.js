const Menu = require("../models/menuModel");

const getAllMenus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalMenus = await Menu.countDocuments();
    const menus = await Menu.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      data: {
        menus,
        currentPage: page,
        totalPages: Math.ceil(totalMenus / limit),
        totalItems: totalMenus,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const addMenu = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields: name, description, price, and category",
      });
    }

    // Validate price
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Price must be a positive number",
      });
    }

    // Create new menu
    const newMenu = new Menu({
      name,
      description,
      price,
      category,
      image: image || "",
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    });

    // Save to database
    const savedMenu = await newMenu.save();

    res.status(201).json({
      status: "success",
      data: {
        menu: savedMenu,
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
  getAllMenus,
  addMenu,
};