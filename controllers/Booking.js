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

exports.getAllBooks = async function(req,res)  {
try {
    const _id = req.userdata._id;
   const booking = await Booking.find({company:_id}).populate("user")
   res.json({success:true,data:booking})
} catch (error) {
    res.status(500).json({
        error: error,
        message: "Failed to get book"
    })
}
res.end()
}


exports.approved=async (req,res)=>{
    try {
        const _id =req.params._id
        const approved_data= await Booking.updateOne(
            {_id:_id},
            {status:req.body.status}


        )
        res.json({success:true,data:approved_data})
        

        
    } catch (error) {
        res.status(500).json({
            error:error,
            message: "failed to approved"
        })
        
    }



}

exports.getapproved = async function(req,res)  {
    try {
        const _id = req.userdata._id;

       const approved = await Booking.find({company:_id,status:"accepted"})
       res.json({success:true,data:approved})
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Failed to get book"
        })
    }
    res.end()
    }

    exports.getdeclined = async function(req,res)  {
        try {
            const _id = req.userdata._id;
    
           const reject = await Booking.find({company:_id,status:"rejected"})
           res.json({success:true,data:reject})
        } catch (error) {
            res.status(500).json({
                error: error,
                message: "Failed to get book"
            })
        }
        res.end()
        }

