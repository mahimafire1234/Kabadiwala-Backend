const express = require('express')
const User = require('../models/user')
const router = new express.Router()
//require Controllers
const { register,showOne, get_company} = require('../controllers/User')

router.post('/register', register)


//link
router.post('/register', register)
router.get('/showOne/:id',showOne)
router.get('/get_company', get_company)
const userController= require('../controllers/User')
// const { login } = require('../controllers/User')

router.post('/register', userController.register)

router.post("/login",userController.login_user)


module.exports = router

