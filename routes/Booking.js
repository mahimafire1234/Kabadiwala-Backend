const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book } = require('../controllers/Booking')

router
.route('/')
.post(book)

module.exports = router