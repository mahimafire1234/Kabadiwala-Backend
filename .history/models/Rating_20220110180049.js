// model for Rating a company
const mongoose = require("mongoose");
// rate schema
const RatingSchema = mongoose.Schema({
    "companyId":{type:String},
    "rating":{
        type:Number,
        default:0
    },
    "userCount":{
        type:Number,
        default:0
    },
    "ratingsGiven"
})

const Rating = mongoose.model("Rating",RatingSchema);
module.exports= Rating;