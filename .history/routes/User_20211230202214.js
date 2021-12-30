const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth=require("../middleware/auth")

//require Controllers
const { register,showOne, get_company,loggedin_user} = require('../controllers/User')

//link
router.post('/register', register)
router.get('/showOne/:id',showOne)
router.get('/get_company', get_company)
router.get("/login_company",login_company)

const userController= require('../controllers/User')

router.post("/login",userController.login_user)

module.exports = router

