'use strict'
//init framwork
const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.set('view engine', 'ejs');

//routes
app.use(express.static('public'));
app.use("/firefighter", require('./routes/firefighter'));
app.use("/api", require('./routes/api'));
app.use("/", require('./routes/index'));

//for debugging
const port = 8000;
app.listen(port, () => console.log(`Running on port ${port}`));

module.exports.server = serverless(app);
