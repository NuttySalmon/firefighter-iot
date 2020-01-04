const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('./map');
});


router.get('/map', (req, res) => {
  res.render('index', {
    title: 'Firefighter Tracker',
  });
});

module.exports = router;
