const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const { register,showOne } = require('../controllers/User')

router.post('/register', register)
router.get('/showOne/:id',showOne)

module.exports = router 