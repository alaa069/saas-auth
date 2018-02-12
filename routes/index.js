const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/main');
//const User = require('../models/user');
const register = require('../controllers/register');
const auth = require('../controllers/auth')

// Home route. We'll end up changing this to our main front end index later.
router.get('/', function (req, res) {
    res.status(200).json({ message: 'You are on API', success: true });
});

router.post('/register', register.register)
router.post('/authenticate', auth.authenticate)

// Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.status(200).json({
        message: 'It worked! User id is: ' + req.user._id + '.',
        id: req.user._id, 
        role: req.user.role,
        email: req.user.email,
        success: true
    });
});

module.exports = router;