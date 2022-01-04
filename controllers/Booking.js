const mongoose = require("mongoose");

const Booking = require("../models/Booking");

// add a booking
exports.book = (req, res) => {
    const booking = new Booking({
        _id: mongoose.Types.ObjectId(),
        company: req.body.company,
        user: req.body.user,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        items: req.body.items,
        total_price: req.body.total_price
    })

    booking.save()
    .then(result => {
        res.status(200).json({
            success: true,
            message: "Booking scheduled successfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: "Booking failed"
        })
    })
}

//view bookings(appointments)
exports.view_appointments = (req, res, next) => {
    const user_id = req.params.id;
    Bookings.find({userID : user_id}).exec()
    .then(FormData => {
         const response = {
         count: FormData.length,
         appointment: FormData.map(data => {
         return {
             status:data.status,
             user: data.user,
             date: data.date,
             time: data.time,
             location: data.location,
             items: data.items,
             total_price: data.total_price,
         };
     })
     }
     res.status(200).json(response);
     })
    .catch(err=>{
        res.status(401).json({
            error: err
        })
    })
 }