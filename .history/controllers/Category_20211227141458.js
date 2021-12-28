const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const fs = require('fs')

const Category = require("../models/category");
const { Module } = require("module");
const { request } = require("http");
//set rate 
exports.insertRate = async (request, response) => {

    // get user,rate,category,price, id from the request
   const userID = request.body.userID;
   const rate = request.body.category_rate;
   console.log(request.body);
   const category =rate[0].category;
   const price = rate[0].price;

   let user = await Category.findOne({userID:userID})
   console.log(user);

   try{
    Category.find({userID:userID})
    .then( data => {
            if(data.length >= 1){

                const rateLength = data[0].category_rate.length
                console.log(category)
                // for array
                // create an array for categories
                let categoryarray = []
                // for loop in the data to push the category in the array above
                for(let i=0;i<=rateLength-1;i++){
                    const categoryName = data[0].category_rate[i].category;
                    categoryarray.push(data[0].category_rate[i].category)
                }
                // check if category to insert in the above array
                console.log(categoryarray.includes(category))
                console.log(categoryarray)
                // condition if yes
                if(categoryarray.includes(category)){
                    return response.json({success:"false",message:"Value added already"});
                }else{
                    user.category_rate.push({
                        price,
                        category
                    });
                    categoryarray.push(category)
                }
                user = user.save();
                return response.status(201).json({
                    success :"true",
                    message :"Value added successfully"
                }) 
            }
            // make new rate for user if user does not exits
    
            else{
                const newPriceAdd = Category.create({
                    "userID":userID,
                    "category_rate":rate
                })
                return response.json({success:"true",message:"Value added successfully"})
            }
        }
    );
   }
   catch{(error)=>{
       response.json({success:"false",message:error})
    }
   }
};
// get rate for one company
exports.getRate = (request,response) => {
    // get id from params
    console.log("got hit")
    const company_id = request.params.id;
    // fetch data in category model:
    try{
        Category.find({userID:company_id}).then(
            (data) => {
                if(data.length > 0){
                    response.send({success:"true",data:data});
                }
                else{
                    response.send({success:"false",message:"No items found"});

               }
            }
        )   
    }
    catch(error){
        response.status(404).json({error:error})
    }
};

//update the rate 
exports.updateate = (req, res, next) => {
    const id = req.params.id;
    const rate = req.body.rate;
    const category = req.body.category;
    console.log(id);
    console.log(rate);

    Category.updateMany({ _id: id }, { rate: rate, category: category })
        .then(data => {
            res.status(201).json({
                success: "true",
                message: "Updated!!"
            })
        })
        .catch(err => {
            res.status(500).json({
                success: "false",
                error: err,
                message: "error"
            })

        })
}




