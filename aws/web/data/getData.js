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



function getISOLocal(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal =  date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
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

function getTeams(){
    var result = []
    for (var i = 0; i < noOfTeams; i++){
        result.push(getTeamInfo(i + 1))
    }
    return result;
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