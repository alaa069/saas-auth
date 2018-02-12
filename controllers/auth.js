const User = require('../models/user');
const config = require('../config/main');
const jwt = require('jsonwebtoken');

var auth = {
    authenticate: function (req, res, next) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                // Check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        console.log(user)
                        // Create token if the password matched and no error was thrown
                        var token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: 10080 // in seconds
                        });
                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                    }
                });
            }
        });
    }
}

module.exports = auth;