const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs')
const nodemailer = require('nodemailer')
const auth = require("../middleware/auth")

const User = require("../models/user");
const Otp = require("../models/Otp");

const { Module } = require("module");


//register user account
exports.register = (req, res) => {
    console.log(req.body)
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    success: false,
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
                            companyLocation: req.body.companyLocation,
                            usertype: req.body.usertype
                        });

                        console.log(user)

                        user
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    success: true,
                                    message: "User created successfully",
                                    data: result
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

//login to account
exports.login_user = function (req, res) {
    console.log(req.body)
    // first we need email and passord 
    const email = req.body.email // email should match to body of postman
    const password = req.body.password

    // we need to check if the username exits or not

    User.findOne({ email: email })
    .exec()
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
                res.end()

            })
        })
        .catch(function (e) {
            console.log(e)
        })
     
}

//show list of companies
exports.get_company = (req, res, next) => {
    User.find({ usertype: 'company' }).exec()
        .then(docs => {
            const response = {
                count: docs.length,
                user: docs.map(doc => {
                    return {
                        id: doc._id,
                        email: doc.email,
                        name: doc.name,
                        phone: doc.phone,
                        image: doc.image,
                    };
                })
            }
            console.log(response)
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(401).json({
                error: err
            })
        })
}

// show one company
exports.showOne = (req, res, next) => {
    console.log("hit")
    const id = req.params.id;
    User.findById(id).exec()
        .then(docs => {
            const response = {
                user: {
                    email: docs.email,
                    name: docs.name,
                    phone: docs.phone,
                    image: docs.image,
                    id: docs._id
                }
            }
            res.status(200).json(response)
        }
        )
        .catch(err => {
            res.status(401).json({
                error: err
            })
            console.log(err);
        });
}

//show logged in company
exports.loggedin_company = function (req, res) {
    // console.log("hit");
    const id = req.userdata._id;
    // console.log(id);
    User.findById(id)
        .then(function (data) {
            res
                .status(200)
                .json({ success: true, data });
            // console.log("company data aayo"+{data});
        })
        .catch(function (e) {
            res.status(500).json({ message: e });
        });
    res.end()
}


//show logged in user
exports.loggedin_user = function (req, res) {
    // console.log("hit");
    const id = req.userdata._id;
    // console.log(id);
    User.findById(id)
        .then(function (data) {
            res
                .status(200)
                .json({ success: true, data });
            console.log("logged in user data aayo" + { data });
        })
        .catch(function (e) {
            res.status(500).json({ message: e });
        });
}

exports.get_user_from_id = (req, res, next) => {

    User.findOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                success: true,
                result: result
            })
            next()
        })
        .catch(err => {
            res.status(401).json({ error: err })
        })

}

exports.update = (req, res, next) => {

    const id = req.userdata._id;
    console.log(req.files);

    User.findByIdAndUpdate(id, req.body)
        .exec()
        .then(result => {
        
            if(req.file != undefined){
                User.findByIdAndUpdate(id, { image: req.file.path })
                .then(result => {
                    res.status(200).json({
                        success: true,
                        message: "User details updated"
                    })
                })
                .catch(err => {
                    res.status(401).json({
                        success: false,
                        error: err,
                        message: "User image update failed"
                    })
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "User details updated"
                })
            }
        
        })
        .catch(err => {
            res.status(401).json({
                success: false,
                error: err,
                message: "Error in updating user details"
            })
        });
};

exports.change_password = (req, res, next) => {
    User.findById(req.userdata._id)
        .exec()
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
        
                if (!result) {
                    return res.status(401).json({
                        message: "Incorrect password"
                    })
                }

                if (result) {
                    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {

                            User.findByIdAndUpdate(req.userdata._id, { password: hash })
                                .then(result => {
                                    return res.status(200).json({
                                        success: true,
                                        message: "Password changed successfully"
                                    })
                                })
                                .catch(err => {
                                    res.status(401).json({
                                        error: err,
                                        message: "Error in password change"
                                    })
                                })

                        }
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: "Error in changing password"
            })
        })
}


exports.forgot_password =  async function (req, res, next) {
    let user_id = req.userdata._id

    User.findById(user_id)
    .then(async (result) => {
        
        if(result != null){
            let otpCode = Math.floor((Math.random() * 10000) + 1)
            await Otp.findOneAndDelete({email: req.userdata.email})

            let optData = Otp({
                email: req.userdata.email,
                code: otpCode,
                expiresIn: Date.now() + 300*1000 // expires in 5 mins
            })

            optData.save()
            .then(result => {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                })
                let mailOptions = {
                    from: "flyingpiranhasforagile@gmail.com",
                    to: req.userdata.email,
                    subject: "Reset password",
                    text: `Reset password \n 
                        Your otp is: ${otpCode} 
                         It will expire in 5 minutes`
                }
            
                transporter.sendMail(mailOptions,  (err,data) => {
                    if(err) {
                        res.status(401).json({
                            success: false, 
                            message: "Error occurs in sending email: " +  err})  ;
                    }else{
                        res.status(200).json({
                            success: true,
                            message: "Email sent!"})
                    } 
                })
            }) 
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: "Error in creating otp"
                })
            })

        }else{
            res.status(401).json({
                success: false,
                message: "Email does not exist"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "Error finding email: " + err,
            error: err
        })
    })
}

exports.reset_password = (req, res) => {
    Otp.findOne({email: req.userdata.email, code: req.body.code})
    .then(result => {
        if(result != null){
            let currentTime = Date.now()
            
            if(currentTime > result.expiresIn) {
                res.status(401).json({
                    success: false,
                    message: "Token has already expired"
                })
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        User.findByIdAndUpdate(req.userdata._id, { password: hash })
                            .then(result => {
                                return res.status(200).json({
                                    success: true,
                                    message: "Password reset successfully"
                                })
                            })
                            .catch(err => {
                                res.status(401).json({
                                    error: err,
                                    message: "Error in password reset"
                                })
                            })
                    }
                })
            }
        }else{
            res.status(500).json({
                success: false,
                message: "Invalid OTP code"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: "Error: " + err
        })
    })
}