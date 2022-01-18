const express = require("express");
// Rating model
const FavoritesModel = require("../models/Favorites");
const router = new express.Router();

const FavoritesController = require("../controllers/Favorites");
router.post("/addfavorites/:id/:companyID",FavoritesController.addFavorites);
router.get("/getFavorites/:id",FavoritesController.getFavorites);
module.exports = router;
