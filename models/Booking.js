const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    datetime: {type: Date},
    location: {type: String},
    status : {
        type: String,
        default: 'pending',
        required: true,
        enum : ['pending', 'accepted', 'rejected', 'completed','cancelled']
    },
    items: {
        type: [
            {
                category: {type: String},
                amount: {type: Number, default: 0},
                category_price: {type: Number}
            }
        ]
    },
    total_price: {type: Number}
}, 
{
    timestamps: true
})
const booking = mongoose.model('booking', bookingSchema)
module.exports = booking