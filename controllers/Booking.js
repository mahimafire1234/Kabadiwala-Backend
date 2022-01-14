const res = require("express/lib/response");
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
                message: "Booking scheduled successfully",
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Booking failed"
            })
        })
}


exports.approved = async (req, res) => {
    try {
        const _id = req.params.id
        const approved_data = await Booking.updateOne(
            { _id: _id },
            { status: "accepted" }


        )
        res.json({ success: true, data: approved_data })



    } catch (error) {
        res.status(500).json({
            error: error,
            message: "failed to approved"
        })

    }



}

exports.declined = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(req.body.status)
        const declined_data = await Booking.updateOne(
            { _id: _id },
            { status: "rejected" }

        )
        console.log(declined_data);
        res.json({ success: true, data: declined_data })



    } catch (error) {
        res.status(500).json({
            error: error,
            message: "failed to declined"
        })

    }



}


exports.getapproved = async function (req, res) {
    try {
        const _id = req.userdata._id;

        const approved = await Booking.find({ company: _id, status: "accepted" }).populate("user")
        console.log(approved)
        res.json({ success: true, data: approved })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get book"
        })
    }
    res.end()
}

exports.getPending = async function (req, res) {
    try {
        const _id = req.userdata._id;
        console.log("error");
        const pending = await Booking.find({ company: _id, status: "pending" }).populate("user")
        console.log(pending)
        res.json({ success: true, data: pending })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get pending"
        })
    }
    res.end()
}

exports.getdeclined = async function (req, res) {
    try {
        const _id = req.userdata._id;

        const reject = await Booking.find({ company: _id, status: "rejected" }).populate("user")
        console.log(reject)
        res.json({ success: true, data: reject })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get book"
        })
    }
    res.end()
}




exports.change_status = async (req, res) => {
    try {
        const _id = req.params._id
        const approved_data = await Booking.updateOne(
            { _id: _id },
            { status: req.body.status }


        )
        res.json({ success: true, data: approved_data })



    } catch (error) {
        res.status(500).json({
            error: error,
            message: "failed to approved"
        })

    }


}

exports.update = (req, res) => {
    Booking.findByIdAndUpdate(req.params.id, req.body)
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Booking updated successfully"
            })
        })
        .catch(error => {
            res.status(500).json({
                error: err,
                message: "Booking updated failed"
            })
        })
}

exports.reminder = (req, res) => {

    const today = Date.now();
    const date = new Date(today);
    const now = date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getDate();

    Booking.find({ datetime: { $gte: Date(now) }, status: 'accepted', user: req.userdata._id })
        .then(result => {
            res.status(200).json({
                success: true,
                result: result,
                message: "Schedule shown"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Schedule not found"
            })
        })

}