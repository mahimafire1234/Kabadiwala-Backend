const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth=require("../middleware/auth")

//require Controllers
const { register,showOne, get_company,loggedin_company,loggedin_user} = require('../controllers/User')

//link
router.post('/register', register)
router.get('/showOne/:id',showOne)
router.get('/get_company', get_company)
router.get("/loggedin_company",auth.verifyAdmin,loggedin_company)
router.get("/loggedin_user",auth.verifyUser,loggedin_user)



const userController= require('../controllers/User')

router.post("/login",userController.login_user)
// router.get("/login_company",auth.verifyAdmin,userController.login_company)

module.exports = router

