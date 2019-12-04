const COLORS = {
  heart: "#FF0C0C",
  hum: "#009CFF",
  temp: "#FF8400",
  pres: "#FAB4B4",
  co: "#7EF27E",
  o2: "#CCD0DE",
  hcn: "#D7C1E0",
  mov: "#D5C4A1",
  battery: "#ACE8D5"
}

function getISOLocal(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal =  date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal.toString();
}


// // for mock data
// const testDate = "2019-12-01T08:30:00"
// var data = [];
// var date = new Date(testDate);
// date.setMilliseconds(0)
// date -= 2000;

/**
Get past data to initialize graph
*/
function getHistory(id, dataPoints, callback){
  let epoch = new Date() - 5000;

  let url = '../api/firefighter/history';
  let payload = {
    'id' : id,
    'count': dataPoints,
    'datetime': Math.round(new Date().getTime() / 1000) * 1000

  };
  getData(url, payload, callback);
}

/**
Generate series of data for graph from bulk data
*/
function generateSeries(field, data){
  let series = [];
  data.forEach((item)=>{
    series.push({
      date: new Date(item.datetime),
      value: item[field]
    })
  });
  return series;
}

/**
Add data to chart
*/
function updateData(chart, tag, value, iso){
  let valueQuery = '#'+ tag + '-value';
  let overlayQuery = '#'+ tag + '-overlay'
  if(value == undefined){
    $(valueQuery).html('');
    $(overlayQuery).css('display', 'block');
  } else{
    $(overlayQuery).css('display', 'none');
    $(valueQuery).html(value.toFixed(2));
    chart.addData({ 
      date:  new Date(iso) , 
      value: value
    }, 1);
  }
}

/**
Start interval to get data
*/
function startInterval(id, interval, callback) {
  setInterval(()=>{
    let epoch = new Date() - 2000;
    let datetime = getISOLocal(new Date(epoch));
    let payload = {
      id: id, 
      datetime: datetime
    };
    getData('../api/firefighter', payload, (data)=>{
      callback(data);
    });
  }, interval);
}


/**
Get data using ajax
*/
function getData(url, payload, callback){
  $.ajax({
    url : url,
    type : 'GET',
    data : payload,
    success : (response) => {   
        if (response.data == null) {
          $('.overlay').css("display", "block"); 
        } else {
          $('.overlay').css("display", "none");             
          callback(response.data);
        }
    },
    error : (request,error) => {
      $('.overlay').css("display", "block");
    }
  });
}