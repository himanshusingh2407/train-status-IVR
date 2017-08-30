var express = require('express');
var xml = require('xml');
var port = process.env.PORT || 5000
var app = express();

app.get('/', function(req, res){
  console.log(req.query);
  res.header('Content-Type', 'text/xml');
  res.send(xml({response: [{
	collectdtmf: [ { _attr: { l: "5", t: "#"} }, 
	{ playtext: 'Hey welcome to our app. Just enter the 6 digit train number to know its running status.'
	}
]}]}));
});
console.log('The app is running at PORT : ' + port);
app.listen(port);