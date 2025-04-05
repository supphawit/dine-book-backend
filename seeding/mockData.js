const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const imageToBase64 = (imagePath) => {
  try {
    const image = fs.readFileSync(imagePath);
    const ext = path.extname(imagePath).toLowerCase();
    const mimeType = ext === ".webp" ? "image/webp" : "image/jpeg";
    return `data:${mimeType};base64,${image.toString("base64")}`;
  } catch (error) {
    console.error(`Error reading image: ${imagePath}`);
    return null;
  }
};

const mockUsers = [
  {
    _id: uuidv4(),
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone: "0891234561",
    password: "password123",
    image: imageToBase64(path.join(__dirname, "images/users/user-1.png")),
    birthdate: new Date("1990-01-15"),
    email_noti: true,
    sms_noti: true,
  },
  {
    _id: uuidv4(),
    firstname: "Test",
    lastname: "Smith",
    email: "test@gmail.com",
    phone: "0891234562",
    password: "12345678",
    image: imageToBase64(path.join(__dirname, "images/users/user-2.png")),
    birthdate: new Date("1992-03-20"),
    email_noti: false,
    sms_noti: true,
  },
  {
    _id: uuidv4(),
    firstname: "Michael",
    lastname: "Johnson",
    email: "michael.j@example.com",
    phone: "0891234563",
    password: "password123",
    image: imageToBase64(path.join(__dirname, "images/users/user-3.png")),
    birthdate: new Date("1988-07-10"),
    email_noti: true,
    sms_noti: false,
  },
  {
    _id: uuidv4(),
    firstname: "Sarah",
    lastname: "Williams",
    email: "sarah.w@example.com",
    phone: "0891234564",
    password: "password123",
    image: imageToBase64(path.join(__dirname, "images/users/user-4.png")),
    birthdate: new Date("1995-11-25"),
    email_noti: true,
    sms_noti: true,
  },
  {
    _id: uuidv4(),
    firstname: "David",
    lastname: "Brown",
    email: "david.b@example.com",
    phone: "0891234565",
    password: "password123",
    image: imageToBase64(path.join(__dirname, "images/users/user-5.png")),
    birthdate: new Date("1991-09-30"),
    email_noti: false,
    sms_noti: false,
  },
];

const mockMenus = [
  {
    _id: uuidv4(),
    name: "Pad Thai",
    description: "Classic Thai stir-fried rice noodles with shrimp",
    price: 120,
    category: "Main Course",
    image: imageToBase64(path.join(__dirname, "images/menu/pad_thai.jpg")),
    inStock: true,
  },
  {
    _id: uuidv4(),
    name: "Green Curry",
    description: "Spicy Thai green curry with chicken",
    price: 150,
    category: "Main Course",
    image: imageToBase64(path.join(__dirname, "images/menu/green_curry.jpg")),
    inStock: true,
  },
  {
    _id: uuidv4(),
    name: "Tom Yum Goong",
    description: "Spicy and sour shrimp soup",
    price: 350,
    category: "Soup",
    image: imageToBase64(path.join(__dirname, "images/menu/tom_yum_goong.jpg")),
    inStock: true,
  },
  {
    _id: uuidv4(),
    name: "Mango Sticky Rice",
    description: "Sweet sticky rice with fresh mango",
    price: 120,
    category: "Dessert",
    image: imageToBase64(
      path.join(__dirname, "images/menu/mango_sticky_rice.webp")
    ),
    inStock: true,
  },
  {
    _id: uuidv4(),
    name: "Massaman Curry",
    description: "Rich and mild Thai curry with potato and chicken",
    price: 250,
    category: "Main Course",
    image: imageToBase64(path.join(__dirname, "images/menu/massaman.jpg")),
    inStock: true,
  },
  {
    _id: uuidv4(),
    name: "Pineapple Fried Rice",
    description: "Fried rice with pineapple, cashews, and chicken",
    price: 250,
    category: "Main Course",
    image: imageToBase64(
      path.join(__dirname, "images/menu/pineapple_fried_rice.jpg")
    ),
    inStock: true,
  },
  {
    _id: uuidv4(),
    name: "Thai Milk Tea",
    description: "Traditional Thai iced milk tea",
    price: 80,
    category: "Beverage",
    image: imageToBase64(path.join(__dirname, "images/menu/thai_milk_tea.jpg")),
    inStock: true,
  },
  {
    _id: uuidv4(),
    name: "Coconut Ice Cream",
    description: "Homemade coconut ice cream with peanuts",
    price: 80,
    category: "Dessert",
    image: imageToBase64(
      path.join(__dirname, "images/menu/coconut_ice_cream.webp")
    ),
    inStock: true,
  },
];

const generateAvailableBooks = () => {
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

  const tables = [
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
  const today = new Date();

  // Generate time slots for next 7 days
  for (let i = 0; i <= 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const dateString = currentDate.toISOString().split("T")[0];

    const daySlots = {
      _id: uuidv4(),
      date: dateString,
      slots: times.map((time) => ({
        _id: uuidv4(),
        time,
        isAvailable: Math.random() > 0.3,
        tables: tables.map((table) => ({
          ...table,
          _id: uuidv4(),
          // Randomly set some tables as unavailable
          isAvailable: Math.random() > 0.3,
        })),
      })),
    };

    timeSlots.push(daySlots);
  }

  return timeSlots;
};

const mockAvailableBooks = generateAvailableBooks();

const mockReviews = [
  {
    _id: uuidv4(),
    userId: mockUsers[0]._id, // John Doe
    overallRating: 4,
    comment: "อาหารอร่อยมาก บรรยากาศดี พนักงานบริการดีเยี่ยม",
    images: [
      imageToBase64(path.join(__dirname, "images/menu/pad_thai.jpg")),
      imageToBase64(path.join(__dirname, "images/menu/green_curry.jpg")),
    ],
    reviewedMenus: [
      {
        _id: uuidv4(),
        menuId: mockMenus[0]._id, // Pad Thai
        rating: 5,
        comment: "ผัดไทยอร่อยมาก กุ้งสดใหม่",
      },
      {
        _id: uuidv4(),
        menuId: mockMenus[1]._id, // Green Curry
        rating: 4,
        comment: "แกงเขียวหวานรสชาติดี แต่เผ็ดไปนิดหน่อย",
      },
    ],
  },
  {
    _id: uuidv4(),
    userId: mockUsers[1]._id, // Test Smith
    overallRating: 5,
    comment: "ประทับใจมาก อาหารอร่อย บรรยากาศดีมาก จะกลับมาอีกแน่นอน",
    images: [
      imageToBase64(path.join(__dirname, "images/menu/tom_yum_goong.jpg")),
    ],
    reviewedMenus: [
      {
        _id: uuidv4(),
        menuId: mockMenus[2]._id,
        rating: 5,
        comment: "ต้มยำกุ้งรสชาติจัดจ้าน ถูกใจมาก",
      },
    ],
  },
  {
    _id: uuidv4(),
    userId: mockUsers[2]._id, // Michael Johnson
    overallRating: 5,
    comment: "ข้าวผัดสับปะรดอร่อยมาก ชาไทยหอมกลมกล่อม",
    images: [
      imageToBase64(
        path.join(__dirname, "images/menu/pineapple_fried_rice.jpg")
      ),
      imageToBase64(path.join(__dirname, "images/menu/thai_milk_tea.jpg")),
    ],
    reviewedMenus: [
      {
        _id: uuidv4(),
        menuId: mockMenus[5]._id, // Pineapple Fried Rice
        rating: 5,
        comment: "ข้าวผัดสับปะรดรสชาติดีมาก เครื่องเคียงครบครัน",
      },
      {
        _id: uuidv4(),
        menuId: mockMenus[6]._id, // Thai Milk Tea
        rating: 5,
        comment: "ชาไทยหอมหวานกำลังดี",
      },
    ],
  },
  {
    _id: uuidv4(),
    userId: mockUsers[3]._id, // Sarah Williams
    overallRating: 3,
    comment: "ไอศครีมมะพร้าวอร่อยมาก แกงมัสมั่นรสชาติดี",
    images: [
      imageToBase64(path.join(__dirname, "images/menu/coconut_ice_cream.webp")),
    ],
    reviewedMenus: [
      {
        _id: uuidv4(),
        menuId: mockMenus[7]._id, // Coconut Ice Cream
        rating: 4,
        comment: "ไอศครีมมะพร้าวหอมมาก ถั่วกรอบอร่อย",
      },
      {
        _id: uuidv4(),
        menuId: mockMenus[4]._id, // Massaman Curry
        rating: 3,
        comment: "แกงมัสมั่นรสชาติดี เนื้อนุ่ม",
      },
    ],
  },
  {
    _id: uuidv4(),
    userId: mockUsers[4]._id, // David Brown
    overallRating: 5,
    comment: "ข้าวเหนียวมะม่วงหวานมาก มะม่วงสุกกำลังดี",
    images: [
      imageToBase64(path.join(__dirname, "images/menu/mango_sticky_rice.webp")),
    ],
    reviewedMenus: [
      {
        _id: uuidv4(),
        menuId: mockMenus[3]._id, // Mango Sticky Rice
        rating: 5,
        comment: "ข้าวเหนียวมะม่วงอร่อยมาก มะม่วงหวานกำลังดี",
      },
    ],
  },
];

module.exports = {
  mockUsers,
  mockMenus,
  mockAvailableBooks,
  mockReviews,
};
