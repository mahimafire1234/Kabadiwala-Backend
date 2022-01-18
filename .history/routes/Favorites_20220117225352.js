const express = require("express");
// Rating model
const FavoritesModel = require("../models/Favorites");
const router = new express.Router();

const FavoritesController = require("../controllers/Favorites");
router.post("/giveRate/:id",rateController.giveRating);
module.exports = router;
