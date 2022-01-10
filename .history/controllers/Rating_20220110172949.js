// model for rating
const ratingModel = require("../models/Rating");

exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    // const userId = req.params.userID;
    const ratingCount = req.body.rating;
    let company = await ratingModel.findOne({companyID:companyId});

    try{
        console.log(company.length);

    // checking if user has already given rating
    if(company.length <= 0){

        ratingModel.create({
            "companyId":companyId,
            "rating":ratingCount,
            "userCount":company.userCount+1
        })
        return res.status(200).json({sucess:true,message:"Added successfully"})
    }else{
        let ratingCounter = company.rating + ratingCount
        let ratingActual = ratingCounter/company.userCount
        ratingModel.updateOne({"companyId":companyId}),{'$set':{
            "rating":ratingActual,
            "userCount":company.userCount+1
        }}.then(()=>{
            res.status(200).json({success:true,message:"Added successfully"})
        })
    }
}
    catch(error){
        res.status(400).send({error:error});
    }
   
}