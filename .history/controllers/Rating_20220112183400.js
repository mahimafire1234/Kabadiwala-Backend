// model for rating
const ratingModel = require("../models/Rating");
// give ratings
exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    // const userId = req.params.userID;
    const ratingCount = req.body.rating;
    let company = await ratingModel.findOne({companyID:companyId});

    try{
        // ratings cannot be more than 5
        if(ratingCount >5 || Number.isInteger(ratingCount)== false){
            return res.status(400).json({success:false,message:"Invalid"})
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
                let sumFunction = (accumulator,curr) => accumulator + curr
                // calculate average rating
                let totalNumOfRatings = company.ratingsGiven.reduce(sumFunction) + ratingCount
                let ratingToShow =totalNumOfRatings/(company.userCount+1);
                // add the new given rating number to the array of ratings given
                company.ratingsGiven.push(ratingCount)
                company.save();
                // update the ratings in the db
                ratingModel.updateOne({"companyId":companyId},{$set:{
                    "rating":ratingToShow.toFixed(1),
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
// get ratings
exports.getRatings = async(req,res) => {
    const company_id = req.params.id;
    ratingModel.findOne({"companyId":company_id}).then((result) => {
        if(result.length > 0){
            return res.status(200).json({success:true,data:res})
        }
    })
}