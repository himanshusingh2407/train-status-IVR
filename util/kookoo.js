var xml = require('xml');
var train = require('./train.js');

function getXMLResponse(response) {
	return xml(response);
}

module.exports = {
	//train.getTrainStatus(trainId, 1)
	getXMLBody : function createResponse(req) {
		var event = req.query.event;
		var data = req.query.data || '';
		var cid = req.query.cid;
		var res;
		if(event){
			if (event == 'NewCall') {
				res = {
					response:
					[{
						playtext: 'Welcome to Rail Jaankaaree.'
					},
					{
						collectdtmf: [ {
							_attr: { t: "#"}
						},
						{
							playtext: 'Please enter the 5 digit train number followed by #'
						}
					]}]
				};
			}
			else if(event == 'GotDTMF'){
				var trainId = req.query.sid.split('$')[1];
				if(trainId || data) {
					console.log('SID:: ', req.query.sid);
					if (trainId) {
						var trainDay = parseInt(data);
						//var trainStatus = train.getTrainStatus(trainId, trainDay);
						if(trainDay || trainDay == 0) {
							if(trainDay == 1 || trainDay == 2 || trainDay == 3) {
								var day = ['Yesterday', 'Today', 'Tomorrow'];
								res = {
									response:
									[{
										playtext: train.getTrainStatus(trainId, trainDay)
									}]
								};
							} else {
								res = {
									response :
									[{
										_attr: { sid: cid + "$" + trainId }
									},
									{
										playtext: "Sorry, wrong input received."
									},
									{
										collectdtmf: [{
											_attr: { t: "#"}
										},
										{
											playtext: 'Please select the date of journey followed by #'
										},
										{
											playtext: '1 for yesterday, 2 for today, 3 for tomorrow'
										}]
									}]
								};
							}
						} else {
							res = {
								response :
								[{
									_attr: { sid: cid + "$" + trainId }
								},
								{
									playtext: "Sorry, no input received."
								},
								{
									collectdtmf: [{
										_attr: { t: "#"}
									},
									{
										playtext: 'Please select the date of journey followed by #'
									}, {
										playtext: '1 for yesterday, 2 for today, 3 for tomorrow'
									}]
								}]
							};
						}
					} else if (data.length == 5){
						// var trainId = parseInt(data);
						var trainId = train.getTrainID(data);
						if(trainId) {
							res = {
								response:
								[{
									_attr: { sid: cid + "$" + trainId }
								},
								{
									collectdtmf: [{
										_attr: { t: "#"}
									},
									{
										playtext: 'Please select the date of journey followed by #'
									}, {
										playtext: '1 for yesterday, 2 for today, 3 for tomorrow'
									}]
								}]
							};
						} else {
							res = {
								response:
								[{
									collectdtmf: [{
										_attr: { t: "#"}
									},
									{
										playtext: 'Sorry, no train found by this train number, Please enter the correct 5 digit train number followed by #.'
									}]
								}]
							};
						}
					}
					else{
						res = {
							response:
							[{
								collectdtmf: [{
									_attr: { t: "#"}
								},
								{
									playtext: 'Please enter the correct 5 digit train number followed by #.'
								}]
							}]
						};
					}
				}
				else {
					res = {
						response:
						[{
							playtext: 'You have not entered anything'
						},
						{
							collectdtmf: [{
								_attr: { t: "#"}
							},
							{
								playtext: 'Please enter the 5 digit train number followed by #.'
							}]
						}]
					};
				}
			}
		}
		else {
			res = {
				response:
				[{
					hangup: ''
				}
			]
		};
	}
	return getXMLResponse(res);
}
};
