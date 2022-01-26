const mongoose = require('mongoose')

const optSchema = mongoose.Schema({
    email: {type: String},
    code: {type: String},
    expiresIn: {type: Number},
}, 
{
    timestamps: true
})
const otp = mongoose.model('otp', optSchema)
module.exports = otp