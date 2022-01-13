// model for rating
const ratingModel = require("../models/Rating");

exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    const ratingCount = req.body.rating;
    const userCount = 0;
}