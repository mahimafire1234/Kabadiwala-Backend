const mongoose = require("mongoose");

const category = new mongoose.Schema({
    Category:{
        type:String,
        enum
    }
})