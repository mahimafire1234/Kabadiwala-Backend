// model for rating
const ratingModel = require("../models/Rating");

exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    const userId = req.params.userID;
    const ratingCount = req.body.rating;
    const userCount = 0;
    const ratingCounter = 0;

    // checking if user has already given rating
    ratingModel.findOne({userID:userId}).then((data) => {
        if(data.length >=1){
            res.status(403).json({success:false,message:"You have already given rating"});
        }else{
            userCount = userCount +1;
            ratingCounter = ratingCounter + ratingCount
            var ratingActual = rati
        }
    })
}