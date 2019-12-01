var fakeData = [
    {},
    {lat: 38.5818756, lng: -121.493181},
    {lat: 38.5518551, lng: -121.491181},
    {lat: 38.5972452, lng: -121.446315},
    {lat: 38.5671344, lng: -121.454877},
    {lat: 38.6251146, lng: -121.461503},   
];

var fakeStatus = ['', 'Deployed', 'Deployed', 'Deployed', 'Enroute', 'Deployed',]
function getFirefighterData(id, datetime){
    var result = {   
            datetime: datetime,
            status: 'Active',
            temp: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 100,
            hum: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 50,
        };
    return result;
}

function getFirefighterDataHistory(id, datetime, count){
    var result = [];
    for (var i = count; i > 0; i--){
        var data = getFirefighterData(id, datetime - i * 1000)
        result.push(data);
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