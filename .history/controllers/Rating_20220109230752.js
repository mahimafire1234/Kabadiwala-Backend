// model for rating
const ratingModel = require("../models/Rating");

exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    // const userId = req.params.userID;
    const ratingCount = req.body.rating;
    let companyRating = ratingModel.findOne({companyID:companyId});

    // checking if user has already given rating
    if(companyRating.length>= 1){

    }
    try{
            
    }
    catch(error){
        res.send(error);
    }
   
}