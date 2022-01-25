const express = require('express')
const Review = require('../models/Review')
const router = new express.Router()
//require Controllers
const {insertReview, getReview} = require('../controllers/Review')

const ReviewController= require('../controllers/Review')

router.post('/insertReview/:id/:company_id',ReviewController.insertReview);
router.get("/getReview/:company_id",ReviewController.getReview);


module.exports = router

