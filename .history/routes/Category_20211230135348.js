const express = require('express')
const Category = require('../models/category')
const router = new express.Router()
//require Controllers
const {insertRate, updateRate,getRate} = require('../controllers/Category')

//link
router.post('/insertRate', insertRate);
// router.put('/updateRate', updateRate)
// router.put('/getRate/:id', getRate)


const categoryController= require('../controllers/Category')

router.post('/insertRate',categoryController.insertRate)
router.put('/updateRate/:id/:objectID', categoryController.updateRate)
router.get("/getRate/:id",categoryController.getRate);


module.exports = router

