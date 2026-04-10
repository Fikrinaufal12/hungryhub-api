const { Restaurant, MenuItem } = require("../models");
const { Op } = require("sequelize");

// CREATE Restaurant
exports.createRestaurant = async (req, res) => {
  try {
    if (!req.body.name || !req.body.address) {
      return res.status(400).json({
        message: "Name dan address wajib diisi",
      });
    }

    const data = await Restaurant.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL Restaurant
exports.getRestaurants = async (req, res) => {
  try {
    const data = await Restaurant.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET DETAIL Restaurant + Menu Items
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Restaurant.findByPk(id, {
      include: MenuItem,
    });

    if (!data) {
      return res.status(404).json({ message: "Restaurant tidak ditemukan" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body.name && !req.body.address) {
      return res.status(400).json({
        message: "Minimal isi name atau address",
      });
    }

    const result = await Restaurant.update(req.body, {
      where: { id },
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE Restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Restaurant.destroy({
      where: { id },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE Menu by Restaurant
exports.createMenuByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body.name || !req.body.price) {
      return res.status(400).json({
        message: "Name dan price wajib diisi",
      });
    }

    const data = await MenuItem.create({
      ...req.body,
      restaurantId: id,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET Menu by Restaurant + FILTER CATEGORY + SEARCH NAME 🔥
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name } = req.query;

    const where = { restaurantId: id };

    if (category) {
      where.category = category;
    }

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    const menus = await MenuItem.findAll({ where });

    if (!menus.length) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};