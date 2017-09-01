var express = require('express');
var xml = require('xml');
var port = process.env.PORT || 5000;
var app = express();
var trainApi = require('./util/train.js');

// console.log(trainApi.getTrainStatus(15274, 1));

app.get('/', function(req, res){
  // console.log(req.query);
  res.header('Content-Type', 'text/xml');

  res.send(xml({response: [{
    playtext: 'test message'
  }]}));
});
console.log('The app is running at PORT : ' + port);
app.listen(port);
