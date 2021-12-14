const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const { register,showOne, get_company} = require('../controllers/User')

router.post('/register', register)
router.get('/showOne/:id',showOne)

router.get('/get_company', get_company)

module.exports = router
