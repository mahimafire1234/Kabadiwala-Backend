const mongoose = require("mongoose");

const category = new mongoose.Schema({
    Category:{
        type:String,
        enum:["bottle","glass","plastic"]
    },
    price:{type:String}
})
const CategoryRate= mongoose.model("CategoryRate",category);
module.exports=CategoryRate;
