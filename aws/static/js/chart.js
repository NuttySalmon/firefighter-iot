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

// for mock data
const testDate = "2019-12-01T08:30:00"
var data = [];
var date = new Date(testDate);
date.setMilliseconds(0)
date -= 2000;

/**
Get past data to initialize graph
*/
function getHistory(id, dataPoints, callback){
  let url = '../api/firefighter/history';
  let payload = {
    'id' : id,
    'count': dataPoints,
    'datetime': date
  };
  getData(url, payload, callback);
  return data;
}

/**
Generate series of data for graph from bulk data
*/
function generateSeries(field, data){
  let series = [];
  data.forEach((item)=>{
    series.push({
      date: item.datetime,
      value: item[field]
    })
  });
  return series;
}

/**
Add data to chart
*/
function updateData(chart, tag, value){
  let valueQuery = '#'+ tag + '-value';
  let overlayQuery = '#'+ tag + '-overlay'
  if(value == undefined){
    $(valueQuery).html('');
    $(overlayQuery).css('display', 'block');
  } else{
    $(overlayQuery).css('display', 'none');
    $(valueQuery).html(value.toFixed(2));
    chart.addData({ date: curr, value: value}, 1);
  }
}

/**
Start interval to get data
*/
function startInterval(id, interval, callback) {
  let i = 0;
  let dataDatetime = date + i;
  let payload = {
    id: id, 
    datetime: date + i
  };
  setInterval(()=>{
    getData('../api/firefighter', payload, (data)=>{
      callback(data, i);
      i += interval;
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
       $('.overlay').css("display", "none");             
       callback(response.data);
    },
    error : (request,error) => {
      $('.overlay').css("display", "block");
    }
  });
}