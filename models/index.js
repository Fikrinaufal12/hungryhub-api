const sequelize = require("../config/database");
const Restaurant = require("./restaurant");
const MenuItem = require("./menuitem");

// RELASI
Restaurant.hasMany(MenuItem, {
  foreignKey: "restaurantId",
});
MenuItem.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
});

module.exports = {
  sequelize,
  Restaurant,
  MenuItem,
};