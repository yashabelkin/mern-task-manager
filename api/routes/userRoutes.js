const express = require('express');
const authController = require('./../controllers/authController')
const passport = require('passport')

const router = express.Router();

router.post('/singup',authController.signup);

router.post('/login',passport.authenticate('local'),  authController.login);





module.exports = router