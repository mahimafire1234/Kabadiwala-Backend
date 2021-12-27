const express = require('express')
const Category = require('../models/category')
const router = new express.Router()
//require Controllers
const {insertRate, get_rates, getRate} = require('../controllers/Category')

router.post('/insertRate', insertRate)
router.get('/:id', get_rates)

module.exports = router

