const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const ddb = new AWS.DynamoDB();


function getFirefighterData(id, datetime, callback) {
  const params = {
    Key: {
      id: {
        S: id,
      },
      datetime: {
        S: datetime,
      },
    },
    TableName: 'Members',
  };
  ddb.getItem(params, (err, result) => {
    if (err) callback(null);
    else callback(AWS.DynamoDB.Converter.unmarshall(result.Item));
  });
}


/**
Get old data for initialize graph
NOT IMPLEMENTED WITH REAL DATA
*/
function getFirefighterDataHistory(id, epoch, count) {
  const result = [];
  for (let i = count; i > 0; i--) {
    const currEpoch = epoch - i * 1000;
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
      datetime: currEpoch,
    };

    // var data = getFirefighterData(id, datetime - i * 1000)
    result.push(fakeData);
  }
  return result;
}


function getTeams(callback) {
  const params = {
    TableName: 'Teams',
  };
  ddb.scan(params, (err, result) => {
    if (err) callback('error');
    else {
      const teams = [];
      result.Items.forEach((item) => {
        teams.push(AWS.DynamoDB.Converter.unmarshall(item));
      });
      callback(teams);
    }
  });
}

module.exports.getFirefighterData = getFirefighterData;
module.exports.getFirefighterDataHistory = getFirefighterDataHistory;
module.exports.getTeams = getTeams;
