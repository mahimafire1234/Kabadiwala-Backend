// this file is for favorites
const { request } = require("express");
const FavoritesModel = require("../models/Favorites");
const User = require("../models/user");

// routes
exports.addFavorites = async (request,response)=>{
    console.log("hit")

    // get user and company id
    const id =  request.params.id;
    const companyID = request.params.companyID;
    try{
        // find user in favorites model
        let favorites=await FavoritesModel.findOne({id:id})
        let companyToadd =await User.findOne({_id:companyID});

        // find product in product model
        // check if user exists
        if(!companyToadd){
            response.json({success:false,message:"company does not exist"})
        }
        // getting product details
        const companyName = companyToadd.name;
        const companyEmail = companyToadd.email;

        // if user exists check if product exists for that user
        if(favorites){
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
                    companyName,
                    companyEmail
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
                    id,
                    company:[{companyID,companyName,companyEmail}]
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

// get the favorites item
exports.getFavorites= async (request,response) => {
    // get user id
    const userId = request.params.id;
    // check if user exists
    try {
        FavoritesModel.find({ id: userId }).then(
            (data) => {
                if(data.length > 0){
                    response.status(200).send({success:true,data:data});
                }
                else {
                    response.status(404).send({ success: false, message: "No items found" });

                }
            }
        )
    }
    catch (error) {
        response.status(404).json({ error: error })
    }
    
};

// delete from favorites
exports.deleteFavorites= async (request,response) => {
    const userId = request.params.id;
    const companyID = request.params.companyID;

    try{
        let favorites = await FavoritesModel.findOne({id:userId})
        let itemIndex = favorites.company.findIndex(p => p.companyID == companyID)
            if(itemIndex > -1){
                // let productItem = favorites.product[itemIndex]
                favorites.company.splice(itemIndex,1);
                // splice removes the item from the cart
            }
            favorites= await favorites.save()
            return response.send({success:true,message:favorites})
    }
    catch(error){
        response.status(404).json({success:false,error:error})
    }
}
