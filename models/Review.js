const mongoose = require('mongoose')
const ReviewSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    review:{
        type:String
    }


})
const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review