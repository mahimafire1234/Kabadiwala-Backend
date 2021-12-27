const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth=require("../middleware/auth")
// const auth = require("../middleware/auth");
//require Controllers
const { register,showOne, get_company,login_company} = require('../controllers/User')

// router.post('/register', register)


//link
router.post('/register', register)
router.get('/showOne/:id',showOne)
router.get('/get_company', get_company)
router.get("/login_company",auth.verifyAdmin,login_company)

const userController= require('../controllers/User')
// const { login } = require('../controllers/User')

// router.post('/register', userController.register)

router.post("/login",userController.login_user)
// router.get("/login_company",userController.login_company)



module.exports = router

