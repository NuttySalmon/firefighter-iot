'use strict'
//init framwork
const express = require('express');
const app = express();


app.set('view engine', 'ejs');

//routes

app.use("/firefighter", require('./routes/firefighter'));
app.use("/api", require('./routes/api'));
app.use("/team", require('./routes/team'));
app.use("/", require('./routes/index'));

//for running locally
module.exports.app = app;