const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const fs = require('fs')

const User = require("../models/user")

exports.register = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email address already used"
                });
            } else {
                
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return error_message(res, err, "Registration failed")
                    } else {
                     
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            phone: req.body.phone,
                            type: req.body.type
                        });

                        user
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    success: true,
                                    message: "User created successfully"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err,
                                    message: "Error creating the user"
                                })
                            })
                    }
                })
            }
        })
};

exports.showOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
    .exe()
    .then(function (data) {
        response.status(201).json(data)
        })
    .catch(function (error) {
        response.status(500).json({ message: "error" })
    })
};
exports.get_company = (req, res, next) => {
   User.find({type:'company'}).exec()
   .then(result =>{
       res.status(200).json({
           success: true,
           result : result
       })
   })
   .catch(err=>{
       res.status(401).json({
           error: err
       })
   })
}
