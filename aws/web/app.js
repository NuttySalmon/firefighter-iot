// init framwork

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// routes

app.get('/', (req, res) => {
  res.redirect('./dashboard/');
});

app.use('/dashboard/', require('./routes/index'));
app.use('/dashboard/firefighter', require('./routes/firefighter'));
app.use('/dashboard/api', require('./routes/api'));
app.use('/dashboard/team', require('./routes/team'));
app.use('/dashboard/', require('./routes/index'));

// for running locally
module.exports.app = app;
