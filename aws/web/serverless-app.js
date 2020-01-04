const serverless = require('serverless-http');
const config = require('./config.js');
const { app } = require('./app.js');

app.locals.googleMapsAPIKey = config.googleMapsAPIKey;
app.locals.staticPath = config.s3Path;
module.exports.server = serverless(app);
