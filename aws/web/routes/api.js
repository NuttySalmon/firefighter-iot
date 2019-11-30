var express = require('express'),
    router = express.Router(),
    getData = require('../data/getData.js');

router.get('/firefighter/', (req, res) => {
    var fighterId = req.query.id;
    var datetime = req.query.datetime;
    var payload = {};
    if (fighterId === undefined|| datetime === undefined){
        payload = {code: 400, status:"fail"};
    } else {
        payload = {
            code: 200,
            status: "success",
            id: fighterId,
            data: getData.getFirefighterData(fighterId, datetime)
        }
    };
   res.json(payload);
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
   console.log(payload);
   res.json(payload);   
});

module.exports = router;