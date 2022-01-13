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
// checking if user has already given rating
            if(company === null){
                console.log("here")
                ratingModel.create({
                    "companyId":companyId,
                    "rating":ratingCount,
                    "userCount":1,
                    "ratingsGiven":ratingCount
            })
            
            return res.status(200).json({success:true,message:"Added successfully"})
            }
            else{
                // get sum of all the rating given
                let reducer = (accumulator,curr) => accumulator + curr
                let ratingCounter = company.ratingsGiven.reduce(reducer) + ratingCount
                let ratingActual = ratingCounter/(company.userCount+1)
                company.ratingsGiven.push(ratingCount)
                company.save();
                ratingModel.updateOne({"companyId":companyId},{$set:{
                    "rating":ratingActual,
                    "userCount":company.userCount+1,
        
                }}).then(()=>{
                    res.status(200).json({success:true,message:"Added successfully"})
                }).catch(
                    (error) => 
                    zconsole.log(error))
            }
        }
  
    }
    catch(error){
        res.status(400).send({error:error});
    }
   
}