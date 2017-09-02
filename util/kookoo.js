var xml = require('xml');
var train = require('./train.js');

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
module.exports = {
	//train.getTrainStatus(trainNumber, 1)
	getXMLBody : function createResponse(req) {
		var event = req.query.event;
		var data = req.query.data;
		if(event){
			if (event == 'NewCall') {
				return (xml({response: [
					{
						playtext: 'Welcome to Shaktiman.'
					},
					{
						collectdtmf: [ {
							_attr: { t: "#"}
						},
						{
							playtext: 'Please enter the 5 digit train number followed by #'
						}
					]}]}));
				}
				else if(event == 'GotDTMF'){
					if(data){
						if (data.length == 5){
							var trainNumber = parseInt(data);
							var trainStatus = train.getTrainStatus(trainNumber, 1);
							return (xml({response: [
								{
									playtext: 'You have entered'
								},
								{
									'say-as': [ {
										_attr:
										{
											format: '501'
										}
									}, data
								] },
								{
									playtext: 'Please wait while we fetch the train running status'
								},
								{
									playtext: trainStatus
								}
							]}));
						}
						else{
							return (xml({response: [
								{
									collectdtmf: [ {
										_attr: { t: "#"}
									},
									{
										playtext: 'Please enter the correct 5 digit train number followed by #.'
									}
								]}]}));
							}
						}
						else {
							return (xml({response: [
								{
									playtext: 'You have not entered anything'
								},
								{
									collectdtmf: [ {
										_attr: { t: "#"}
									},
									{
										playtext: 'Please enter the 5 digit train number followed by #.'
									}
								]}]}));
							}
						}
					}
					else {
						return (xml({response: [
							{
								hangup: ''
							}
						]}));
					}
				}
			};
