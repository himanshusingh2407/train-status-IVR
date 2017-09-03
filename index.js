var express = require('express');
var port = process.env.PORT || 5000;
var app = express();
var trainApi = require('./util/train.js');
var xmlBody = require('./util/kookoo.js');

app.get('/', function(req, res){
  res.header('Content-Type', 'text/xml');
  res.send(xmlBody.getXMLBody(req));
});
console.log('The app is running at PORT : ' + port);
app.listen(port);
