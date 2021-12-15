const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const userController= require('../controllers/User')
// const { login } = require('../controllers/User')

router.post('/register', userController.register)

router.post("/login",userController.login_user)

module.exports = router