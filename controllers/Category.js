const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const fs = require('fs')

const Category = require("../models/category");
const { Module } = require("module");
const { request } = require("http");
const { response } = require("express");
//set rate 
exports.insertRate = async (request, response) => {

    // get user,rate,category,price, id from the request
    const userID = request.body.userID;
    const category_rate = request.body.category_rate;
    console.log(request.body);
    const category = category_rate[0].category;
    const price = category_rate[0].price;

    let user = await Category.findOne({ userID: userID })
    console.log(user);

    try {
        Category.find({ userID: userID })
            .then(data => {
                if (data.length >= 1) {

                    const rateLength = data[0].category_rate.length
                    console.log(category)
                    // for array
                    // create an array for categories
                    let categoryarray = []
                    // for loop in the data to push the category in the array above
                    for (let i = 0; i <= rateLength - 1; i++) {
                        const categoryName = data[0].category_rate[i].category;
                        categoryarray.push(data[0].category_rate[i].category)
                    }
                    // check if category to insert in the above array
                    console.log(categoryarray.includes(category))
                    console.log(categoryarray)
                    // condition if yes
                    if (categoryarray.includes(category)) {
                        return response.json({ success: false, message: "Value added already" });
                    } else {
                        user.category_rate.push({
                            price,
                            category
                        });
                        categoryarray.push(category)
                    }
                    user = user.save();
                    return response.status(201).json({
                        success: true,
                        message: "Value added successfully"
                    })
                }
                // make new category_rate for user if user does not exits

                else {
                    const newPriceAdd = Category.create({
                        "userID": userID,
                        "category_rate": category_rate
                    })
                    return response.json({ success: true, message: "Value added successfully" })
                }
            }
            );
    }
    catch {
        (error) => {
            response.json({ success: "false", message: error })
        }
    }
};

// get rate for one company
exports.getRate = (request, response) => {
    // get id from params
    console.log("got hit")
    const company_id = request.params.id;
    // fetch data in category model:
    try {
        Category.find({ userID: company_id }).then(
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

//update the rate 
exports.updateRate = (req, res) => {
    // user id
    console.log(req.body);
    const id = req.params.id; 
    const objectID = req.params.objectID;

    const price = req.body.price;
    try{
        // check if the user exists in the category model
        Category.find({userID:id}).then(
            (data) => {
                if(data.length > 0){
                    // update category rate data for partciular object id
                    Category.updateOne({"category_rate._id":objectID},{'$set': {
                        'category_rate.$.price': price,
                    }}).then(()=>{
                        return res.status(201).json({success:true,message:"Updated successfully"});
                    }).catch((err)=>{
                        return res.status(404).json({success:false,message:err});
                    })
                
                }else{
                    res.status(404).json({error:error});
                }
            }
        )
    }
    catch(error){
        response.status(404).json({error:error});
    }
   
}




