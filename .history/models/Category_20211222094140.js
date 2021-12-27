const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    userID: { type: String },
    rate: [
        {
            price: { type: String },
            category: {
                type: String,
                enum: ['bottle', 'plastic', 'glass']
            }
        }
    ]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category