const s3Name = 'firefighter-web-assets';  // use unique name
const awsRegion = 'us-east-1';
const googleMapsAPIKey = '';  // add your own api key 
const googleMapsAPIKeyLocal = ''; // api key for local testing
module.exports.s3Name = () => {return s3Name}

module.exports.s3Path = 'http://' + s3Name + '.s3-website-'+ awsRegion + '.amazonaws.com/'
module.exports.googleMapsAPIKey = googleMapsAPIKey;
module.exports.googleMapsAPIKeyLocal = googleMapsAPIKeyLocal;
module.exports.awsRegion = awsRegion;
