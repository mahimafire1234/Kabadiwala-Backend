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

// get book request

exports.getAllBooks = async function (req, res) {
    try {
        const _id = req.userdata._id;
        const booking = await Booking.find({ company: _id }).populate("user")
        res.json({ success: true, data: booking })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get book"
        })
    }
    res.end()
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


exports.getdeclined = async function (req, res) {
    try {
        const _id = req.userdata._id;

        const reject = await Booking.find({ company: _id, status: "rejected" })
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
//client side view approved
exports.viewapproved = async function (req, res) {
    try {
        const _id = req.userdata._id;

        const approved = await Booking.find({ user: _id, status: "accepted" })
        res.json({ success: true, data: approved })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get book"
        })
    }
    res.end()
}

//client side view pending
exports.viewpending = async function (req, res) {
    try {
        const _id = req.userdata._id;

        const pending = await Booking.find({ user: _id, status: "pending" })
        res.json({ success: true, data: pending })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get book"
        })
    }
    res.end()
}

//client side view declined
exports.viewdeclined = async function (req, res) {
    try {
        const _id = req.userdata._id;

        const reject = await Booking.find({ user: _id, status: "rejected" })
        res.json({ success: true, data: reject })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get book"
        })
    }
    res.end()
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
        }
        )

}

//update bookings
exports.updateBook = (req, res) => {
    const id = req.params.id;
    const booking_id = req.params.booking_id;

    try {
        Booking.find({ user: id }).then(
            (data) => {
                if (data.length > 0) {
                    Booking.findByIdAndUpdate({ "_id": booking_id }, { $set: req.body }, { new: true }).exec()
                        .then((result) => {
                            res.status(201).send({ success: true, message: "Updated successfully" });
                            console.log(data);
                        }).catch((err) => {
                            return res.status(404).send({ success: false, message: err });
                        })
                } else {
                    res.status(404).json({ error: error });
                }
            }
        )
    } catch (error) {
        response.status(404).json({ error: error });
    }
}
    
  

// }

// exports.getapproved = async function(req,res)  {
//     try {
//         const _id = req.userdata._id;

//        const approved = await Booking.find({company:_id,status:"accepted"})
//        res.json({success:true,data:approved})
//     } catch (error) {
//         res.status(500).json({
//             error: error,
//             message: "Failed to get book"
//         })
//     }
//     res.end()
//     }

//     exports.getdeclined = async function(req,res)  {
//         try {
//             const _id = req.userdata._id;
    
//            const reject = await Booking.find({company:_id,status:"rejected"})
//            res.json({success:true,data:reject})
//         } catch (error) {
//             res.status(500).json({
//                 error: error,
//                 message: "Failed to get book"
//             })
//         }
//         res.end()
//         }




//         exports.change_status=async (req,res)=>{
//     try {
//         const _id =req.params._id
//         const approved_data= await Booking.updateOne(
//             {_id:_id},
//             {status:req.body.status}


//         )
//         res.json({success:true,data:approved_data})
        

        
//     } catch (error) {
//         res.status(500).json({
//             error:error,
//             message: "failed to approved"
//         })
        
//     }




