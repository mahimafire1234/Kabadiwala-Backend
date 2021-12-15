const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const fs = require('fs')

const User = require("../models/user");
const { Module } = require("module");

//register user account
exports.register = (req, res) => {
    console.log(req.body)
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
                        return res.status(500).json({
                            error: err,
                            message: "Registration failed"
                        })
                    } else {
                     
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            phone: req.body.phone,
                            usertype: req.body.usertype
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
                                console.log(err)
                            })
                    }
                })
            }
        })
};
// show one company
exports.showOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .exec()
    .then(function (data) {
        res.status(201).json(data)
        })
    .catch(function (error) {
        res.status(500).json({ message: "error" })
    })
};
//show list of companies
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


exports.login_user =  function (req, res) {
    console.log(req.body)
    // first we need email and passord 
    const email = req.body.email // email should match to body of postman
    const password = req.body.password

    // we need to check if the username exits or not

    User.findOne({ email: email })
        .then(function (userdata) {
            console.log(userdata)


            // all the data of email is now in variable userdata
            if (userdata === null) {
                // If username is invalid
                return res.status(403).json({ message: "Invalid login credential" })
            }
            // for valid user 
            bcrypt.compare(password, userdata.password, function (err, result) {
                if (result === false) {
                    return res.status(403).json({ message: "invalid password" })
                }

                // both email and passord is correct
                // res.send("login succesfull")
                console.log("login succesfull")
                // now we need to create token
                const token = jwt.sign({ YourID: userdata._id }, "anysecretkey");
                res.status(200).json({
                    success: true,
                    token: token,
                    usertype: userdata.usertype,
                    data: userdata,
                    message: "auth success"
                });

            }

            )

        })

        .catch(function (e) {
            console.log(e)
        })

}

