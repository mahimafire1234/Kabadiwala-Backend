const mongoose = require("mongoose");

const Booking = require("../models/Booking");

// add a booking
exports.book = (req, res) => {
    console.log(req.userdata)
    const booking = new Booking({
        _id: mongoose.Types.ObjectId(),
        company: req.body.company,
        user: req.userdata._id,
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