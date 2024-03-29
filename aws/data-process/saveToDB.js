console.log('Loading function');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ttlOffset = 65;

// Create DynamoDB service object
const ddb = new AWS.DynamoDB();

/** ***************Put Data************************************ */

exports.handler = (event, context, callback) => {
  const members = []; // for team info
  const requests = [];

  // calculate ttl
  const datetime = event.datetime.toString();
  const epoch = Math.floor(new Date().getTime() / 1000);
  const teamId = event.clientId;

  console.log(epoch);
  const ttl = epoch + ttlOffset;

  event.members.forEach((member) => {
    members.push(member.deviceId); // for team info
    if (member.connected) {
      const item = {
        id: { S: member.deviceId.toString() },
        team: { N: teamId },
        datetime: { S: datetime },
        temp: { N: member.temp.toString() },
        pres: { N: member.pres.toString() },
        hum: { N: member.hum.toString() },
        sos: { BOOL: member.button },
        o2: { N: member.o2.toString() }, // int
        co: { N: member.co.toString() },
        hcn: { N: member.hcn.toString() },
        mov: { N: member.mov.toString() },
        heart: { N: member.heart.toString() }, // int
        battery: { N: member.battery.toString() }, // int
        TTL: { N: ttl.toString() },

      };
      requests.push({
        PutRequest: {
          Item: item,
        },
      });
    }
  });

  const paramsMem = {
    RequestItems: {
      Members: requests,
    },
  };

  /** ***************End Put Data************************************ */


  const paramsTeam = {
    TableName: 'Teams',
    Item: {
      id: { N: teamId },
      status: { S: event.status },
      members: { S: members.toString() },
      lat: { N: event.lat.toString() },
      lng: { N: event.lng.toString() },
    },
  };

  console.log(paramsMem);

  // Call DynamoDB to add the item to the table
  ddb.putItem(paramsTeam, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
    }
  });


  ddb.batchWriteItem(paramsMem, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
    }
  });

  callback();
};
