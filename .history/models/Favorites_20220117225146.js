// model for favorites
const mongoose = require('mongoose')
var SCHEMA = mongoose.Schema;

const FavoritesSchema = new mongoose.Schema({
    "userID": { type: String },
    "category_rate":[{
        "price": { type: String },
        "category": {type: String}
    }
    ]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;