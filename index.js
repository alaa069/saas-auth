const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config/main');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const API = require('./routes/index');
const port = 3000;

app = express();

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// Initialize passport for use
app.use(passport.initialize());

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {
  res.send('Relax. We will put the home page here later.');
});

// Connect to database
mongoose.connect(config.database);

// Bring in defined Passport Strategy
require('./config/passport')(passport);

app.use('/app', API)

// Start the server
app.listen(port);
console.log('Your server is running on port ' + port + '.');