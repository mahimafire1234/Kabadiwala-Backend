const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book,getAllBooks,approved,getapproved, getdeclined, reminder } = require('../controllers/Booking')
const { verifyUser, verifyAdmin } = require('../middleware/auth')

router
.route('/')
.post(verifyUser, book)

router
.route('/')
.get(verifyAdmin, getAllBooks)


router
.route('/approved/:_id')
.put(verifyAdmin, approved)


router
.route('/get_approved')
.get(verifyAdmin, getapproved)

router
.route('/get_decline')
.get(verifyAdmin, getdeclined)

router
.route('/reminder')
.get(reminder)

module.exports = router