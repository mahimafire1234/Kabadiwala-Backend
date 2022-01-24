const express = require('express')
const User = require('../models/Booking')
const router = new express.Router()

    
  
const { book, getPending, approved, getapproved,getallBooks, getdeclined, reminder, viewapproved, viewdeclined, viewpending, updateBook, update ,declined,get_one, approvedOrderRequest} = require('../controllers/Booking')
const { verifyUser, verifyAdmin } = require('../middleware/auth')

router
    .route('/')
    .post(verifyUser, book)

router
    .route('/update/:id')
    .put(verifyAdmin, update)

router
    .route('/get_payment/:usertype/:id')
    .get(get_one)

    router
    .route('/getAllBooking')
    .get(getallBooks)


// router.get('/viewAppointments/:id', view_appointments)
// router
// .route('/viewAppointments/:id')
// get(view_appointments)


router
.route('/approved/:id')
.put(verifyAdmin, approved)

router
.route('/approvedOrderRequest/:id')
.put(verifyAdmin, approvedOrderRequest)

router
.route('/declined/:id')
.put(verifyAdmin, declined)



router
    .route('/get_approved')
    .get(verifyAdmin, getapproved)

router
    .route('/get_decline')
    .get(verifyAdmin, getdeclined)

//client side view status
//view approved
router
    .route('/view_approved')
    .get(verifyUser, viewapproved)

//view declined
router
    .route('/view_declined')
    .get(verifyUser, viewdeclined)

//view pending
router
    .route('/view_pending')
    .get(verifyUser, viewpending)

router
    .route('/get_pending')
    .get(verifyAdmin, getPending)




//update booking
router
    .route('/updateBook/:id/:booking_id')
    .put(updateBook)

router
    .route('/reminder')
    .get(verifyUser, reminder)
module.exports = router