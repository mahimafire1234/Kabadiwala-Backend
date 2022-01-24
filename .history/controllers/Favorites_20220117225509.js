// this file is for favorites
const express = require("express");
const router = new express.Router();
const FavoritesModel = require("../models/Favorites");
const ProductModel = require("../models/User");

// routes
router.post("/addfavorites/:id",async (request,response)=>{

    // get user and product id
    const userId =  request.params.id;
    const productId = request.body.productId;

    try{
        // find user in favorites model
        user=await FavoritesModel.findOne({userId:userId})
        product =await ProductModel.findOne({_id:productId});
        // find product in product model
        // check if user exists
        if(!product){
            response.json({success:"false",message:"Product does not exist"})
        }
        // getting product details
        const productName = product.productName;
        const productImage = product.productImage;

        // if user exists check if product exists for that user
        if(user){
            let itemIndex = user.product.findIndex(p => p.productId == productId)
            // if product exists do nothing
            if(itemIndex > -1){
                let productItem = user.product[itemIndex]
                user.product[itemIndex] = productItem
            }
            // else add product for the usr
            else{
                user.product.push({
                    productId,
                    productName,
                    productImage
                })
            }
            // save the favorites
            user=await user.save()
            return response.status(201).json({
                success :"true",
                data : user
            })
        }
        else{
            // if favorites does not exists for user create new one
            const newWishlist = await FavoritesModel.create(
                {
                    userId,
                    product:[{productId,productName,productImage}]
                }
            )
            return response.status(201).json({success :"true",data : newWishlist})
        }

    }
    catch{
        (error)=>{
            response.json({success:"false", error:error});
    }}

});