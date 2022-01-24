const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {type: String},
    phone: {type: String},
    password: {type: String},
    image: {type: String},
    companyLocation:{type:String},
    usertype: {
        type: String,
        enum: ['company', 'user']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User