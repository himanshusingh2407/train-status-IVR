var express = require('express');
var xml = require('xml');
var port = process.env.PORT || 5000
var app = express();

app.get('/', function(req, res){
  console.log(req.query);
  res.header('Content-Type', 'text/xml');
  res.send(xml({response: [{
	collectdtmf: [ { _attr: { l: "5", t: "#"} }, 
	{ playtext: 'Enter the 5 digit train number followed by Hash.'
	}
]}]}));
});
console.log('The app is running at PORT : ' + port);
app.listen(port);