const s3Name = 'firefighter-web-assets';  // use unique name
const googleMapsAPIKey = 'AIzaSyCf0GTb9p4ksFKrcs_fms33bIb_AEniq7I';  // change to your own 
const googleMapsAPIKeyLocal = 'AIzaSyCdxcUu_caB5cLs82rZbAZiiFJscFlDwXk';
module.exports.s3Name = () => {return s3Name}
module.exports.staticPath = 'http://' + s3Name + '.s3-website-us-east-1.amazonaws.com/'
module.exports.googleMapsAPIKey = googleMapsAPIKey;
module.exports.googleMapsAPIKeyLocal = googleMapsAPIKeyLocal;
