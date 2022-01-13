const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

<<<<<<< HEAD
const { book,getPending,approved,getapproved, getdeclined, reminder, view_appointments, viewapproved, viewdeclined, viewpending } = require('../controllers/Booking')
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

//client side view status
//view approved
router
    .route('/view_approved')
    .get(verifyUser, viewapproved)
module.exports = router

//view declined
router
    .route('/view_declined')
    .get(verifyUser, viewdeclined)
module.exports = router

//view pending
router
    .route('/view_pending')
    .get(verifyUser, viewpending)
module.exports = router

=======
const { book,getAllBooks,approved,getapproved, getdeclined } = require('../controllers/Booking')
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
module.exports = router
>>>>>>> Ratings
