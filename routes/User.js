const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const { register, get_company } = require('../controllers/User')

router.post('/register', register)
router.get('/get_company', get_company)


module.exports = router