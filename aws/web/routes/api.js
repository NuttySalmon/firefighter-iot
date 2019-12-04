var express = require('express'),
    router = express.Router(),
    getData = require('../data/getData.js');

router.get('/firefighter/', (req, res) => {
    var fighterId = req.query.id;
    var datetime = req.query.datetime;
    var payload = {};
    if (fighterId === undefined|| datetime === undefined){
        payload = {code: 400, status:"fail"};
        res.json(payload);
    } else {
      getData.getFirefighterData(fighterId, datetime, (data)=>{
        payload = {
            code: 200,
            status: "success",
            id: fighterId,
            data: data
        }
        res.json(payload);
      });
    };
});

router.get('/firefighter/history', (req, res) => {
   var fighterId = req.query.id;
   var datetime = req.query.datetime;
   var count  = req.query.count;
   if (fighterId == undefined|| datetime == undefined || count == undefined)
        res.json({code: 400, status:"fail"});
   var payload = {
        code: 200, 
        status: "success",
        id: fighterId,
        data: getData.getFirefighterDataHistory(fighterId, datetime, count)
   };
   res.json(payload);   
});

router.get('/teams', (req, res) => {
   var payload = {
        code: 200, 
        status: "success",
        data: getData.getTeams()
   };
   res.json(payload);   
});

module.exports = router;