var express = require('express');
var xml = require('xml');
var port = process.env.PORT || 5000
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function callApi(url) {
  var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function getTrainID(trainNumber) {
  var response = callApi("https://api.railbeeps.com/api/searchTrains?trainno=" + trainNumber);
  return response[0].id;
}

function getTrainStatus(trainID) {
  var response = callApi("https://api.railbeeps.com/api/getRunningStatus/trainno/" + trainID + "/date/Wed,%2030th%20Aug");
  console.log(response);
}

getTrainStatus(getTrainID(15274));

app.get('/', function(req, res){
  // console.log(req.query);
  res.header('Content-Type', 'text/xml');

  res.send(xml({response: [{
    playtext: 'Hey welcome to our app. Just enter the 6 digit train number to know its running status.'
  }]}));
});
console.log('The app is running at PORT : ' + port);
app.listen(port);
