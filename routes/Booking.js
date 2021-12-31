const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book } = require('../controllers/Booking')
const { verifyUser } = require('../middleware/auth')

router
.route('/')
.post(verifyUser, book)

module.exports = router