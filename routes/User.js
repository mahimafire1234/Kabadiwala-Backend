const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth=require("../middleware/auth")
const upload = require("../middleware/fileUpload")

//require Controllers
const { register,showOne, get_company,loggedin_company,loggedin_user, update, change_password, forgot_password} = require('../controllers/User')

//link
router.post('/register', register)
router.get('/showOne/:id',showOne)
router.get('/get_company', get_company)
router.get("/loggedin_company",auth.verifyAdmin,loggedin_company)
router.get("/loggedin_user",auth.verifyUser,loggedin_user)

router
.route('/')
.patch(auth.verifyLoggedIn, upload.single('image'), update)
.get(auth.verifyLoggedIn, (req, res) => res.status(200).json({success: true, data: req.userdata}))

router
.route('/password')
.patch(auth.verifyLoggedIn, change_password)

router
.route('/forgot_password')
.get(forgot_password)




const userController= require('../controllers/User')

router.post("/login",userController.login_user)
// router.get("/login_company",auth.verifyAdmin,userController.login_company)

module.exports = router

