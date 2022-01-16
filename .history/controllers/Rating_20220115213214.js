// model for rating
const ratingModel = require("../models/Rating");
// give ratings
exports.giveRating = async(req,res) => {
    const companyId = req.params.id;
    console.log(companyId);
    // const userId = req.params.userID;
    const ratingCount = req.body.rating;
    let company = await ratingModel.findOne({companyID:companyId});
    console.log(req.body.rating);
    try{
        //   // ratings cannot be more than 5
        //   if(ratingCount >5 || Number.isInteger(ratingCount)== false){
        //         return res.status(400).json({success:false,message:"Invalid"})
        //     }
        ratingModel.find({companyID:companyId})
        .then(
            (data)=>{
            if(data.length >=1){
                ratingModel.create({
                    "companyId":companyId,
                    "rating":ratingCount,
                    "userCount":1,
                    "ratingsGiven":ratingCount
            })
            return res.status(200).json({success:true,message:"Added successfully"})
            }else{
                
        })
    
        }
    catch(error){
        res.status(400).send({success:false,error:error});
    }
   
}
// get ratings
exports.getRatings = (req,res) => {
    const company_id = req.params.id;
    try{
        ratingModel.findOne({companyId:company_id}).then(
            (data) => {
               
             return res.status(200).json({success:true,data:data})
                
            }
        )
    }
    catch(error){
        return res.status(404).json({success:false,message:error});
    }
    
}