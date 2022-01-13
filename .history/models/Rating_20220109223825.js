// model for Rating a company
const mongoose = require("mongoose");
// rate schema
const RatingSchema = mongoose.Schema({
    "companyId":{type:String}
})