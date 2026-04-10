const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/", restaurantController.createRestaurant);
router.get("/", restaurantController.getRestaurants);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

// TAMBAHKAN DI SINI 👇
router.post("/:id/menu_items", restaurantController.createMenuByRestaurant);
router.get("/:id/menu_items", restaurantController.getMenuByRestaurant);
module.exports = router;