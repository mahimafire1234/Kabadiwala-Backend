const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book,getPending,approved,getapproved, getdeclined, reminder, get_one, declined } = require('../controllers/Booking')
const { verifyUser, verifyAdmin } = require('../middleware/auth')

router
.route('/')
.post(verifyUser, book)




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
.get(verifyUser, reminder)

router
.route('/get_pending')
.get(verifyAdmin, getPending)

router
.route('/get_payment/:usertype/:id')
.get(get_one)

module.exports = router
