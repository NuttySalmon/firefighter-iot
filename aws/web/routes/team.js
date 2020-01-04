const express = require('express');
const getData = require('../data/getData.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  const teamId = req.params.id;
  const teamInfo = getData.getTeamInfo(teamId);
  res.render('team', {
    title: `${teamInfo.name} stats`,
    team: teamInfo,
    fields: [
      { name: 'Temperature', tag: 'temp', unit: '&#176;C' },
      { name: 'Heart rate', tag: 'heart', unit: 'bpm' },
      { name: 'Movement', tag: 'mov', unit: '' },
    ],
  });
});

module.exports = router;
