const express = require('express');
const getData = require('../data/getData.js');

const router = express.Router();

router.get('/firefighter/', (req, res) => {
  const fighterId = req.query.id;
  const { datetime } = req.query;
  let payload = {};
  if (fighterId === undefined || datetime === undefined) {
    payload = { code: 400, status: 'fail' };
    res.json(payload);
  } else {
    getData.getFirefighterData(fighterId, datetime, (data) => {
      payload = {
        code: 200,
        status: 'success',
        id: fighterId,
        data,
      };
      res.json(payload);
    });
  }
});

router.get('/firefighter/history', (req, res) => {
  const fighterId = req.query.id;
  const { datetime } = req.query;
  const { count } = req.query;
  if (fighterId === undefined || datetime === undefined || count === undefined) res.json({ code: 400, status: 'fail' });
  const payload = {
    code: 200,
    status: 'success',
    id: fighterId,
    data: getData.getFirefighterDataHistory(fighterId, datetime, count),
  };
  res.json(payload);
});


router.get('/teams', (req, res) => {
  getData.getTeams((data) => {
    const payload = {
      code: 200,
      status: 'success',
      data,
    };
    res.json(payload);
  });
});
module.exports = router;
