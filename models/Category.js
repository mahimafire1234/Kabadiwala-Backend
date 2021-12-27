const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    "userID": { type: String },
    "category_rate":[{
        "price": { type: String },
        "category": {type: String}
    }
    ]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;