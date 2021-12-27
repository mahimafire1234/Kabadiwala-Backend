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
   const userID = request.body.userID;
   const rate = request.body.rate;
   const price = rate[0].price;
   let user = await Category.findOne({userID:userID})
   let CategoryArray =[];
   try{
    Category.find({userID:userID})
    .then( data => {
            if(data.length >= 1){
                const rateLength = data[0].rate.length
                console.log(rateLength)
                for(let i=0;i<=rateLength-1;i++){
                    const category =rate[i].category;
                    CategoryArray.push()
                    const categoryName = data[0].rate[i].category;
                    console.log(categoryName)
                    if(categoryName === category){
                        return response.json({success:"false",message:"value added already"});
                    }else{
                        user.rate.push({
                            price,
                            category
                        });
                        console.log("pushed")
                    }
                    user = user.save();
                    return response.status(201).json({
                        success :"true",
                        message :rate
                    })  
                }
            }
            else{
                const newPriceAdd = Category.create({
                    userID,
                    rate
                })
                return response.json({success:"true",message:"Added"})
            }
        }
    )
   }
   catch{(error)=>{
       response.json({success:"false",message:error})
    }
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

exports.updateRate = (req, res, next) => {
    const id = req.params.id;
    console.log(id);

    Category.findByIdAndUpdate(id, req.body) //updated by id
        .exec() //execute
        .then(data => {
            res.status(200).json({
                success: true,
                message: "Updated"
            });
            console.log(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// exports.insertRate = (req, res, next) => {
//     const userID = req.body.userID;
//     const rate = req.body.rate;
//     const category = req.body.category;

//     try{
//         let category_rate = await Category.findOne({userID:userID});
//         let rate = await Category.find({category:category})

//         if (!rate){
//             res.status(404).json({
//                 success: "false",
//                 message: "You havenot added any price rates"
//             })
//         }

//     }
//     console.log(req.body)
//     Category.find({ userID: req.body.userID , category: req.body.category })
//         .exec()
//         .then(data => {
//             if (data.length >= 1) {
//                 return res.status(409).json({
//                     success: false,
//                     message: "You have already set the rate"
//                 });
//             } else {
//                 const userID = req.body.userID;
//                 const rate = req.body.rate;
//                 const category = req.body.category;

//                 const data = new Category({
//                     userID: userID,
//                     rate: rate,
//                     category: category,
                
//                 });

//                 console.log(data);
//                 data.save()
//                     .then(result => {
//                         res.status(201).json({
//                             success: true,
//                             message: "Rate inserted!"
//                         })
//                         console.log("inserted");
//                     })
//                     .catch(err => {
//                         res.status(500).json({
//                             error: err,
//                             message: "Error in insertion"
//                         })
//                     })

//             }
//         })
// };
