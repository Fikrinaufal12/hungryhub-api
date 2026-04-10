const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hungryhub_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;