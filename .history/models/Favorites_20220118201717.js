// model for favorites
const mongoose = require('mongoose')
const FavoritesSchema = new mongoose.Schema({
    "id": { type: String },
    "company":[{
        "companyID": { type: String },
        "companyName": {type: String},
        "companyEmail":{type:String},
        
    }
    ]
})

const Favorites = mongoose.model('Favorites', FavoritesSchema)

module.exports = Favorites;