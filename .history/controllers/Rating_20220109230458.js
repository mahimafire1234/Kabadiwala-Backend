// model for rating
const ratingModel = require("../models/Rating");

exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    // const userId = req.params.userID;
    const ratingCount = req.body.rating;
    let companyRating = 
    // checking if user has already given rating
    try{
            ratingCounter = ratingCounter + ratingCount
            var ratingActual = ratingCounter/userCount
            var createModel = new ratingModel(
                {
                    "companyID":companyId,
                    "rating":ratingActual,
                    "userCount":userCount+1
                }
            )
            res.status(201).json({success:true,message:"You have successfully added rating"});
    }
    catch(error){
        res.send(error);
    }
   
}