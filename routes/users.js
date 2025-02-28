const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { checkReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.route('/register')
    .get(users.indexRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.indexLogin)
    .post(checkReturnTo,  
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
        users.login
    );

router.get('/logout', users.logout);

module.exports = router;