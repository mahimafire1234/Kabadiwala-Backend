const { status } = require("express/lib/response");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const Review = require('../models/Review')

// add a Review
exports.insertReview = (req, res) => {
    const data = new Review({
        company: req.params.company_id,
        user: req.params.id,
        review: req.body.review
    })

    data.save()
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Review inserted successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "Review failed"
            })
        })
}

//get review
exports.getReview = async function (req, res) {
    const company_id = req.params.company_id;
    try {
        const data = await
            Review.find({ company: company_id }).populate("user").exec()
        console.log(data);    

        res.json({ success: true, data: data })

    }

    catch (error) {
        res.status(404).json({ success: false, message: error });
    }
    res.end()

}