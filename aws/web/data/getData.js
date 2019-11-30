function getFirefighterData(id, datetime){
    var result = {   
            datetime: datetime,
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


module.exports.getFirefighterData = getFirefighterData;
module.exports.getFirefighterDataHistory = getFirefighterDataHistory;