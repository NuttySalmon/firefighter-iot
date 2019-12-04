var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

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
/*    var result = {   
            datetime: datetime,
            status: 'Active',
            temp: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 100,
            hum: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 50,
			pres: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 100,
			o2: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 40,
			co: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 60,
			hcn: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 50,
			heart: (Math.random() > 0.5 ? 20 : -20) * Math.random()/10 + 160,
			mov: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 100,
			battery: (Math.random() > 0.5 ? 1 : -1) * Math.random()/10 + 100
        };
		return  result;
*/

//~Comment the below portion if you want to reuse the above commented function...
/*****************Declare DynamoDB Service*************************************/
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
/*****************End DynamoDB Service*************************************/
	var params = {
	  Key: {
	   "id": {
		 N: id
		}, 
	   "datetime": {
		 S: datetime 
		}
	  }, 
	  TableName: "Members"
	};
	 ddb.getItem(params, function(err, data) {
	   if (err) console.log(err, err.stack); // an error occurred
	   else     console.log(data);           // successful response
	 });
/*****************End Get Firefighter Data*************************************/
     return data;
//~Commented out to here...
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