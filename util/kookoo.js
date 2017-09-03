var xml = require('xml');
var train = require('./train.js');

module.exports = {
	//train.getTrainStatus(trainNumber, 1)
	getXMLBody : function createResponse(req) {
		var event = req.query.event;
		var data = req.query.data || '';
		var cid = req.query.cid;
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
            console.log('SID:: ', req.query.sid);
            var trainNumber = req.query.sid.split('$')[1];
            if (trainNumber) {
              var trainDay = parseInt(data);
							var trainStatus = train.getTrainStatus(trainNumber, trainDay);
							return (xml({response: [ {
                _attr: { sid: cid + "$" + data }
              },
								{
									playtext: 'You have entered'
								},
								{
									'say-as': [ {
										_attr:
										{
											format: '501',
											lang: 'EN'
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
            } else if (data.length == 5){
							// var trainNumber = parseInt(data);
							// var trainStatus = train.getTrainStatus(trainNumber, 0);
							return (xml({response: [ {
                _attr: { sid: cid + "$" + data }
              },
								{
									collectdtmf: [ {
										_attr: { t: "#"}
									},
									{
										playtext: 'Please enter 0 for yesterday status 1 for today status and 2 for tomorrow status followed by #.'
									}
								]}]}));
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
