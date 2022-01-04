const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book,getAllBooks,approved,getapproved, getdeclined ,view_appointments} = require('../controllers/Booking')
const { verifyUser, verifyAdmin } = require('../middleware/auth')

router
.route('/')
.post(verifyUser, book)

router.get('/viewAppointments/:id', view_appointments)
// router
// .route('/viewAppointments/:id')
// get(view_appointments)


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
module.exports = router