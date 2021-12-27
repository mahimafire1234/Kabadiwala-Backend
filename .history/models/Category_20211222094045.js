const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    userID: { type: String },
    rate:
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category