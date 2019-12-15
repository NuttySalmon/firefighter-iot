var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
  res.redirect('./map');
});


router.get('/map', (req, res) => {
    var fighterName = req.params.name;
    res.render('index', {
      title: 'Firefighter Tracker'
    });
});

module.exports = router;