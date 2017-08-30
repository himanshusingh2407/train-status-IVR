var express = require('express');
var xml = require('xml');
var port = process.env.PORT || 5000;
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Calls the api using GET method and returns the JSON response
function callApi(url) {
  var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function getDate(day) {
  var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// day = 1 for today (default)
  var d = new Date();

// day = 0 for yesterday
  if(day == 0) {
    d = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  }
  // day = 2 for tomorrow
  else if(day == 2) {
    d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  }
  return (d.getDate() + ' ' + m_names[d.getMonth()]);
}

function getTrainID(trainNumber) {
  var response = callApi("https://api.railbeeps.com/api/searchTrains?trainno=" + trainNumber);
  return response[0].id;
}

function getTrainStatus(trainID, day) {
  console.log(getDate(0));
  var response = callApi("https://api.railbeeps.com/api/getRunningStatus/trainno/" + trainID + "/date/" + getDate(day));
  let currentStation = response.markers.filter(station => station.status === 'current')[0].title;
  let stationCode = currentStation.split('(')[1].slice(0, -1);
  let delay = response.stations.filter(station => station.source_code === stationCode)[0].delay_arrival;
  return ('The current station is ' + currentStation.split('(')[0] + ' and delay is ' + delay + ' minutes');
}

console.log(getTrainStatus(getTrainID(15274), 1));

app.get('/', function(req, res){
  // console.log(req.query);
  res.header('Content-Type', 'text/xml');

  res.send(xml({response: [{
    playtext: 'Hey welcome to our app. Just enter the 6 digit train number to know its running status.'
  }]}));
});
console.log('The app is running at PORT : ' + port);
app.listen(port);
