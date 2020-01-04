const port = 8000;
const express = require('express');
const { app } = require('./app.js');
const config = require('./config.js');

app.use(express.static('../static'));
app.locals.staticPath = '/';
app.locals.googleMapsAPIKey = config.googleMapsAPIKeyLocal;

app.listen(port, () => console.log(`Running on port ${port}`));
