const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const fs = require('fs')

const Category = require("../models/category");
const { Module } = require("module");

//set rate 
exports.insertRate = async (req, res, next) => {
    const userID = req.body.userID;
    console.log(userID);
    const category_rate = req.body.category_rate;
    const category = req.body.category_rate[0].category;
    const price = req.body.category_rate[0].price;

    let user = await Category.findOne({ userID: userID })
    try {
        Category.find({ userID: userID })
            .exec()
            .then(data => {
                if (data.length >= 1) {
                    const category_rateLength = data[0].category_rate.length
                    console.log("length : " + category_rateLength);
                    //creating an array for categories
                    let categoryarray = []
                    //for loop in the data to push the category in the array
                    for (let i = 0; i < category_rateLength; i++) {
                        const categoryName = data[0].category_rate[i].category;
                        categoryarray.push(data[0].category_rate[i].category)
                    }
                    // check if category to insert in the above array
                    console.log(categoryarray.includes(category))
                    console.log(categoryarray)
                    // condition if yes
                    if (categoryarray.includes(category)) {
                        return res.json({ success: "false", message: "value added already" });
                    } else {
                        user.category_rate.push({
                            price,
                            category
                        });
                        categoryarray.push(category)
                    }
                    user.save()
                    console.log("pushed")
                    return res.status(201).json({
                        success: "true",
                        message: "inserted"

                    })
                } else {
                    const data = new Category({
                        userID: userID,
                        category_rate: category_rate
                    })
                    data.save()
                        .then(result => {
                            res.status(201).json({
                                success: "true",
                                message: "Inserted"
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err,
                                message: "Error in insertion"
                            })
                        })
                }
            });
    } catch {
        (err) => {
            res.json({ success: "false", message: error })
        }

    }
}

exports.get_rates = (req, res) => {
    const id = req.body.id

    Category.findOne({userID: id})
    .then(result => {
        res.status(200).json({
            success: true,
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "Error getting rates"
        })
    })
}
