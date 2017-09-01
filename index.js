var express = require('express');
var xml = require('xml');
var port = process.env.PORT || 5000
var app = express();

/* function welcomeResponse(req) {
	return (xml({response: [
	{
		collectdtmf: [ {
			  _attr: { l: "1", t: "#"} 
			},
			{
				playtext: 'Welcome to Shaktiman. Press 1 followed by hash to know train running status, press 9 followed by # to exit.'
			}
	]}]}));
}
function mainMenuResponse(req) {
	var req_json = req.query;
	var event = 
	var data = req_json['data'];
	if(data){
		if(data == '1'){
			return listMenuResponse(req);
		}
		else if(data == '9') {
			return (xml({response: [
			{
				hangup: ''
			}]}));
		}
	}
}

function listMenuResponse(req) {
	return (xml({response: [
	{
		collectdtmf: [ {
			  _attr: { l: "5", t: "#"} 
			}, 
			{ 
			  playtext: 'Enter the 5 digit train number followed by Hash.'
			}
		]}]}));
}

function subListMenuResponse(req) {
	var req_json = req.query;
	var data = req_json['data'];
	if(data) {
		if(data.length == 5){
			return (xml({response: [
				{
					playtext: 'You have entered ' + data
				},
				{
					collectdtmf: [ {
						_attr: { l: "1", t: "#"} 
					}, 
					{ 
						playtext: 'Enter the 5 digit train number followed by Hash.'
					}
			
		]}));
		}
	}
}

function reenterResponse(req) {
	
}*/

app.get('/', function(req, res){
  console.log(req.query);
  var event = req.query['event']
  var data = req.query['data'];
  console.log(event);
  res.header('Content-Type', 'text/xml');
  if(event){
	if (event == 'NewCall') {
	res.send(xml({response: [
		{
			collectdtmf: [ {
				_attr: { l: "5", t: "#"} 
				},
				{
					playtext: 'Welcome to Shaktiman. To know current running train status, please enter the 5 digit train number followed by #.'
				}
		]}]}));
	}
	else if(event == 'GotDTMF'){
		if(data){
			res.send(xml({response: [
				{
					playtext: 'You have entered ' + data
				}
			]}));
		}
		else {
			res.send(xml({response: [
				{
					playtext: 'You have not entered anything'
				},
				{
				collectdtmf: [ {
					_attr: { l: "5", t: "#"} 
					},
					{
					playtext: 'Please enter the 5 digit train number followed by #.'
					}
			]}]}));				
		}
	}
  }
  else {
	res.send(xml({response: [
		{
			playtext: 'You have entered ' + data
		}
	]}));
  }
});
console.log('The app is running at PORT : ' + port);
app.listen(port);