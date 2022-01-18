const express = require("express");
// Rating model
const FavoritesModel = require("../models/Favorites");
const router = new express.Router();

const FavoritesController = require("../controllers/");
router.post("/giveRate/:id",rateController.giveRating);
router.get("/getRate/:id",rateController.getRatings);
module.exports = router;
