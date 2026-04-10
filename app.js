const express = require("express");
const { sequelize } = require("./models");

// import routes
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();
app.use(express.json());

// routes
app.use("/restaurants", restaurantRoutes);
app.use("/menu_items", menuRoutes); // ✅ sesuai soal

// sync database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced");
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// run server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});