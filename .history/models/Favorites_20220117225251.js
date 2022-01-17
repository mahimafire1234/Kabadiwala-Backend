// model for favorites
const mongoose = require('mongoose')
const FavoritesSchema = new mongoose.Schema({
    "userID": { type: String },
    "comapny":[{
        "companyID": { type: String },
        "companyName": {type: String}
    }
    ]
})

const Favorites = mongoose.model('Favorites', FavoritesSchema)

module.exports = Favorites;