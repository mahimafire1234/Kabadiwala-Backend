const express = require("express");
// Rating model
const RatingModel = require("../models/Rating");
const router = new express.Router();

const rateController = require("../controllers/Rating");
router.post("/giveRate/:id",rateController.giveRating);
router.get("/getRate/:id",rateController.getRatings);
module.exports = router;
