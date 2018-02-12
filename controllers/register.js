const User = require('../models/user');
const config = require('../config/main');

var sign = {
    register: function (req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.json({ success: false, message: 'Please enter email and password.' });
        } else {
            var newUser = new User({
                email: req.body.email,
                password: req.body.password
            });

            // Attempt to save the user
            newUser.save(function (err) {
                if (err) {
                    return res.json({ success: false, message: 'That email address already exists.' });
                }
                res.json({ success: true, message: 'Successfully created new user.' });
            });
        }
    }
}

module.exports = sign