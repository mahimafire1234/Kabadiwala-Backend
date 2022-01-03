const mongoose = require("mongoose");

const Booking = require("../models/Booking");

// add a booking
exports.book = (req, res) => {
    req.body.user = req.userdata._id;
    const booking = new Booking(req.body);

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