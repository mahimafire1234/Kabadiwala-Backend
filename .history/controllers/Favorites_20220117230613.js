// this file is for favorites
const express = require("express");
const router = new express.Router();
const FavoritesModel = require("../models/Favorites");
const UserModel = require("../models/User");

// routes
exports.addFavorites = async (request,response)=>{

    // get user and product id
    const userId =  request.params.id;
    const companyID = request.params.companyID;

    try{
        // find user in favorites model
        user=await FavoritesModel.findOne({userID:userId})
        companyToadd =await UserModel.findOne({_id:companyID});
        // find product in product model
        // check if user exists
        if(!companyToadd){
            response.json({success:false,message:"company does not exist"})
        }
        // getting product details
        const companyName = company.name;

        // if user exists check if product exists for that user
        if(user){
            let itemIndex = user.company.findIndex(p => p.companyID == companyID)
            // if product exists do nothing
            if(itemIndex > -1){
                let companyItem = user.company[itemIndex]
                user.company[itemIndex] = companyItem
            }
            // else add product for the usr
            else{
                user.company.push({
                    companyID,
                    companyName
                })
            }
            // save the favorites
            user=await user.save()
            return response.status(201).json({
                success :true,
                data : user
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