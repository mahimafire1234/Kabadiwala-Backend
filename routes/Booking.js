const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book,getAllBooks,approved,getapproved, getdeclined } = require('../controllers/Booking')
const { verifyUser, verifyAdmin } = require('../middleware/auth')

router
.route('/')
.post(verifyUser, book)

router
.route('/getAllBooks')
.get(verifyAdmin, getAllBooks)


router
.route('/approved/:id')
.put(verifyAdmin, approved)


router
.route('/get_approved')
.get(verifyAdmin, getapproved)
module.exports = router

router
.route('/get_decline')
.get(verifyAdmin, getdeclined)
module.exports = router