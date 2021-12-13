const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const { register } = require('../controllers/User')

router.post('/register', register)

module.exports = router