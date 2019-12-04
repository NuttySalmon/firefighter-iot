'use strict';

console.log('Loading function');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const ttlOffset = 65;

// Create DynamoDB service object
var ddb = new AWS.DynamoDB();

/*****************Put Data*************************************/

exports.handler = (event, context, callback) =>{

	var members = []; // for team info
	var requests = [];
	
	// calculate ttl
	var datetime = event.datetime.toString();
	var epoch = Math.floor(new Date().getTime() / 1000);
	
	console.log(epoch);
	var ttl = epoch + ttlOffset;
	
	event.members.forEach((member)=>{
		members.push(member.deviceId); // for team info
		if (member.connected){
			var item ={
				'id': {S: member.deviceId.toString()},
				'datetime': {S: datetime},
				'temp': {N: member.temp.toString()},
				'pres': {N: member.pres.toString()},
				'hum': {N: member.hum.toString()},
				'sos': {BOOL: member.button},
				'o2': {N: member.o2.toString()}, 		//int
				'co': {N: member.co.toString()},
				'hcn': {N: member.hcn.toString()},
				'mov': {N: member.mov.toString()},
				'heart': {N: member.heart.toString()},	//int
				'battery': {N: member.battery.toString()},	//int
				'TTL': {N: ttl.toString()},
				
			}
			requests.push({
				"PutRequest": {
					"Item": item
				}
			});
		}
		
	});

	var paramsMem = {
		  RequestItems: {
			'Members': requests
		}
	};

	/*****************End Put Data*************************************/
	
		
	var paramsTeam = {
	  TableName: 'Teams',
	  Item: {
		'id' : {N: event.clientId},
		'status': {S: event.status},
		'member': {S: members.toString()},
		'lat': {N: event.lat.toString()},
		'lng': {N: event.lng.toString()}
	  }
	};
	
	console.log(paramsMem);
	
	// Call DynamoDB to add the item to the table
	ddb.putItem(paramsTeam, function(err, data) {
	  if (err) {
		console.log("Error", err);
	  } else {
		console.log("Success", data);
	  }
	});


	ddb.batchWriteItem(paramsMem, function(err, data) {
	  if (err) {
		console.log("Error", err);
	  } else {
		console.log("Success", data);
	  }
	});
	
	callback();
};