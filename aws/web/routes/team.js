var express = require('express'),
    router = express.Router(),
    getData = require('../data/getData.js');

router.get('/:id', (req, res) => {
    var teamId = req.params.id;
    teamInfo = getData.getTeamInfo(teamId);
    res.render('team', {
        title: teamInfo.name + ' stats',
        fighters: teamInfo.membersId,
        fields: [
            {name: 'Temperature', tag:'temp', unit:'&#176;C'},
            {name: 'Humidity', tag:'hum', unit: '&#37;'},
            {name: 'Pressure', tag:'pres', unit: 'Pa'},
            {name: 'O2 Level', tag:'o2', unit: '%'},
            {name: 'CO concentration', tag:'co', unit: 'ppm'},
            {name: 'HCN concentration', tag:'hcn', unit: 'ppm'},
            {name: 'Heart rate', tag:'heart', unit: 'bpm'},
            {name: 'Movement', tag:'mov', unit: ''}
        ]
    });
});

module.exports = router;