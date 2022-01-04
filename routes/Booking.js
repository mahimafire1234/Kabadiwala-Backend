const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

const { book , view_appointments} = require('../controllers/Booking')

router
.route('/')
.post(book)

router.get('/viewAppointments', view_appointments)
module.exports = router