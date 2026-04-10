const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// CREATE & READ
router.post("/", menuController.createMenu);
router.get("/", menuController.getMenus);

// UPDATE & DELETE
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;