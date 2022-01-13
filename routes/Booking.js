const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

<<<<<<< HEAD
const { book,getPending,approved,getapproved, getdeclined, reminder, get_one, declined } = require('../controllers/Booking')
=======
const { book,getAllBooks,approved,getapproved, getdeclined } = require('../controllers/Booking')
>>>>>>> 02525aa45a87f3055d2dcbec1819afea9c9b60db
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
module.exports = router

router
.route('/get_decline')
.get(verifyAdmin, getdeclined)
<<<<<<< HEAD

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
=======
module.exports = router
>>>>>>> 02525aa45a87f3055d2dcbec1819afea9c9b60db
