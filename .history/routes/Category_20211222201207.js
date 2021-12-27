const express = require('express')
const Category = require('../models/category')
const router = new express.Router()
//require Controllers
const {insertRate, updateRate} = require('../controllers/Category')

//link
router.post('/insertRate', insertRate)
router.put('/updateRate', updateRate)


const categoryController= require('../controllers/Category')

router.post('/insertRate',async categoryController.insertRate)
router.put('/updateRate', categoryController.updateRate)

module.exports = router

