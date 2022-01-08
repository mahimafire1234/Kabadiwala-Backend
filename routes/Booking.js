const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book,approved,declined,getapproved, getdeclined,getPending } = require('../controllers/Booking')
const { verifyUser, verifyAdmin } = require('../middleware/auth')

router
.route('/')
.post(verifyUser, book)

// router
// .route('/getAllBooks')
// .get(verifyAdmin, getAllBooks)

router
.route('/approved/:id')
.put(verifyAdmin, approved)

router
.route('/declined/:id')
.put(verifyAdmin, declined)




router
.route('/get_approved')
.get(verifyAdmin, getapproved)

router
.route('/get_decline')
.get(verifyAdmin, getdeclined)

router
.route('/get_pending')
.get(verifyAdmin, getPending)
module.exports = router