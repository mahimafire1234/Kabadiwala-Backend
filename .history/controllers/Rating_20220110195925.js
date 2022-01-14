// model for rating
const ratingModel = require("../models/Rating");

exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    // const userId = req.params.userID;
    const ratingCount = req.body.rating;
    let company = await ratingModel.findOne({companyID:companyId});

    try{
        if(ratingCount >5){
            return res.status(400).json({success:false,message:"Inavlid"})
        }
        else{

        }
    
}
    catch(error){
        res.status(400).send({error:error});
    }
   
}