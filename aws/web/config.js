const s3Name = 'firefighter-web-assets';  // use unique name
const googleMapsAPIKey = '';  // add your own api key 
const googleMapsAPIKeyLocal = ''; // api key for local testing
module.exports.s3Name = () => {return s3Name}
module.exports.staticPath = 'http://' + s3Name + '.s3-website-us-east-1.amazonaws.com/'
module.exports.googleMapsAPIKey = googleMapsAPIKey;
module.exports.googleMapsAPIKeyLocal = googleMapsAPIKeyLocal;
