const { sequelize, Restaurant, MenuItem } = require("../models");

const seedData = async () => {
  try {
    // RESET DATABASE (hapus semua tabel & buat ulang)
    await sequelize.sync({ force: true });

    // CREATE RESTAURANTS
    const restaurants = await Restaurant.bulkCreate([
      {
        name: "Warung Nusantara",
        address: "Jakarta",
        phone: "0811111111",
        opening_hours: "08:00 - 22:00",
      },
      {
        name: "Cafe Santai",
        address: "Bandung",
        phone: "0822222222",
        opening_hours: "09:00 - 23:00",
      },
    ]);

    // CREATE MENU ITEMS (≥5 per restaurant 🔥)
    await MenuItem.bulkCreate([
      // Restaurant 1
      {
        name: "Nasi Goreng",
        description: "Nasi goreng spesial",
        price: 20000,
        category: "main",
        restaurantId: restaurants[0].id,
      },
      {
        name: "Mie Goreng",
        description: "Mie goreng lezat",
        price: 18000,
        category: "main",
        restaurantId: restaurants[0].id,
      },
      {
        name: "Ayam Goreng",
        description: "Ayam crispy",
        price: 25000,
        category: "main",
        restaurantId: restaurants[0].id,
      },
      {
        name: "Es Teh",
        description: "Minuman segar",
        price: 5000,
        category: "drink",
        restaurantId: restaurants[0].id,
      },
      {
        name: "Pisang Goreng",
        description: "Cemilan manis",
        price: 10000,
        category: "dessert",
        restaurantId: restaurants[0].id,
      },

      // Restaurant 2
      {
        name: "Burger",
        description: "Burger daging",
        price: 30000,
        category: "main",
        restaurantId: restaurants[1].id,
      },
      {
        name: "Pizza",
        description: "Pizza keju",
        price: 50000,
        category: "main",
        restaurantId: restaurants[1].id,
      },
      {
        name: "Kopi",
        description: "Kopi hitam",
        price: 15000,
        category: "drink",
        restaurantId: restaurants[1].id,
      },
      {
        name: "Milkshake",
        description: "Minuman susu",
        price: 20000,
        category: "drink",
        restaurantId: restaurants[1].id,
      },
      {
        name: "Cake",
        description: "Kue manis",
        price: 25000,
        category: "dessert",
        restaurantId: restaurants[1].id,
      },
    ]);

    console.log("✅ Seed data berhasil dibuat!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seed:", error);
    process.exit(1);
  }
};

seedData();