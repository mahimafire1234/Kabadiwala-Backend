// this file is for favorites
const FavoritesModel = require("../models/Favorites");
const User = require("../models/User");

// routes
exports.addFavorites = async (request,response)=>{

    // get user and product id
    const id =  request.params.id;
    const companyID = request.params.companyID;

    try{
        // find user in favorites model
        let favorites=await FavoritesModel.findOne({userID:userId})
        let companyToadd =await User.find({_id:companyID});
        // find product in product model
        // check if user exists
        if(!companyToadd){
            response.json({success:false,message:"company does not exist"})
        }
        // getting product details
        const companyName = companyToadd.name;

        // if user exists check if product exists for that user
        if(user){
            let itemIndex = favorites.company.findIndex(p => p.companyID == companyID)
            // if product exists do nothing
            if(itemIndex > -1){
                let companyItem = favorites.company[itemIndex]
                favorites.company[itemIndex] = companyItem
            }
            // else add product for the usr
            else{
                favorites.company.push({
                    companyID,
                    companyName
                })
            }
            // save the favorites
            favorites=await favorites.save()
            return response.status(201).json({
                success :true,
                data : favorites
            })
        }
        else{
            // if favorites does not exists for user create new one
            const newWishlist = await FavoritesModel.create(
                {
                    userId,
                    company:[{companyID,companyName}]
                }
            )
            return response.status(201).json({success :true,data : newWishlist})
        }

    }
    catch{
        (error)=>{
            response.json({success:false, error:error});
    }};

};