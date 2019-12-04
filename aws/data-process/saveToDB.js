'use strict';

console.log('Loading function');
//The old saved data below...
/*
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('value1 =', event.key1);
    console.log('value2 =', event.key2);
    console.log('value3 =', event.key3);
    callback(null, event.key1);  // Echo back the first key value
    //callback('Something went wrong');
};
*/

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/*****************Put Data*************************************/

exports.handler = async (event, context, callback) =>{
	
	var paramsTeam = {
	  TableName: 'Teams',
	  Item: {
		'id' : {N: event.id},
	  }
	};


	var requests = [];
	var datetime = event.datetime.toString();

	event.members.forEach((member)=>{
		item ={
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
			'battery': {N: member.battery.toString()}	//int
			
		}
		
		requests.push({
			"PutRequest": {
				"Item": item
			}
		});
	});

	var paramsMem = {
		  RequestItems: {
			'Members': requests;
		};
	};

	/*****************End Put Data*************************************/

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
	
	callback('Test');
};