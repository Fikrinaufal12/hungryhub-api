const { MenuItem, Restaurant } = require("../models");

// CREATE Menu
exports.createMenu = async (req, res) => {
  try {
    // VALIDASI
    if (!req.body.name || !req.body.price) {
      return res.status(400).json({
        message: "Name dan price wajib diisi",
      });
    }

    const data = await MenuItem.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET Menu + Relasi
exports.getMenus = async (req, res) => {
  try {
    const data = await MenuItem.findAll({
      include: Restaurant,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE Menu by Restaurant
exports.createMenuByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // VALIDASI
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

// UPDATE MENU
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await MenuItem.update(req.body, {
      where: { id },
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    res.json({ message: "Menu updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE MENU
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await MenuItem.destroy({
      where: { id },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};