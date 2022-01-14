// model for Rating a company
const mongoose = require("mongoose");
// rate schema
const RatingSchema = mongoose.Schema({
    "companyId":{type:String},
    "rating":{type:Number},
    "userCount":{type:Number}
})

const Rating = mongoose.model("Rating",RatingSchema);
module.exports= Rating;
