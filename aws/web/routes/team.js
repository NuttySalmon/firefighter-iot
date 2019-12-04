var express = require('express'),
    router = express.Router(),
    getData = require('../data/getData.js');

router.get('/:id', (req, res) => {
    var teamId = req.params.id;
    teamInfo = getData.getTeamInfo(teamId);
    res.render('team', {
        title: teamInfo.name + ' stats',
        team: teamInfo,
        fields: [
            {name: 'Temperature', tag:'temp', unit:'&#176;C'},
            {name: 'Heart rate', tag:'heart', unit: 'bpm'},
            {name: 'Movement', tag:'mov', unit: ''}
        ]
    });
});

module.exports = router;