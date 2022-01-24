// model for favorites
const mongoose = require('mongoose')
var SCHEMA = mongoose.Schema;

const FavoritesSchema = new mongoose.Schema({
    "userID": { type: String },
    "comapny":[{
        "companyID": { type: String },
        "category": {type: String}
    }
    ]
})

const Favorites = mongoose.model('Favorites', FavoritesSchema)

module.exports = Favorites;