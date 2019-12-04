var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB();


function getFirefighterData(id, datetime, callback){
    var params = {
      Key: {
       "id": {
         S: id
        }, 
       "datetime": {
         S: datetime 
        }
      }, 
      TableName: "Members"
    };
    ddb.getItem(params, (err, result)=>{
        if (err)
            callback(null);
        else
            callback(AWS.DynamoDB.Converter.unmarshall(result.Item));    
    });     
}





function getFirefighterDataHistory(id, epoch, count){

    var result = [];
    for (var i = count; i > 0; i--){
        let currEpoch = epoch - i * 1000;
        const fakeData = {
            temp: 0,
            hum: 0,
            heart: 0,
            o2: 0,
            co: 0,
            hcn: 0,
            pres: 0,
            battery: 0,
            mov: 0,
            datetime: currEpoch
        }
        
        //var data = getFirefighterData(id, datetime - i * 1000)
        result.push(fakeData);
    }
    return result;
}

var noOfTeams = 5;

function getTeams(callback){
    
    var params = {
              TableName: "Teams"
             };
     ddb.scan(params, (err, result)=>{
        if (err)
            callback("error");
        else
            var teams = []
            result.Items.forEach((item)=>{
                teams.push(AWS.DynamoDB.Converter.unmarshall(item));
            })
            callback(teams);    
    });  
}

function getTeamInfo(id){
    var result = {
        id: id,
        name: "Team " + id,
        pos: {
            lat: fakeData[id].lat + Math.random()/5000,
            lng: fakeData[id].lng +  Math.random()/5000
        },
        status: fakeStatus[id],
        membersId: ['iotDevice' + id + '1', 'iotDevice' + id + '2']
    }
    return result;
}

module.exports.getFirefighterData = getFirefighterData;
module.exports.getFirefighterDataHistory = getFirefighterDataHistory;
module.exports.getTeams = getTeams;
module.exports.getTeamInfo = getTeamInfo;
