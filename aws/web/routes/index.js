var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
  res.redirect('home/map');
});


router.get('/home/map', (req, res) => {
    var fighterName = req.params.name;
    res.render('index', {
      title: 'Firefighter Tracker',
      test: 'hello'
    });
});

module.exports = router;