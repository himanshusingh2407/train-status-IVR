var date = require('./date.js');
var api = require('./api.js');

function getTrainID(trainNumber) {
  var response = api.callApi("/searchTrains?trainno=" + trainNumber);
  if(response.length != 0)
  return response[0].id;
  else
  return null;
}

module.exports = {
  getTrainStatus: function(trainNumber, day) {
    var msg;
    var trainID = getTrainID(trainNumber);
    if(trainID) {
      //console.log(date.getDate(0));
      var response = api.callApi("/getRunningStatus/trainno/" + trainID + "/date/" + date.getDate(day));
      if (response.errorMsg) {
        return response.errorMsg;
      }
      let currentStation = response.markers.filter(station => station.status === 'current');
      let stationCode, stationDisplayed, delay;
      let trainName = response.details.name;
      let trainNo = response.details.number;
      console.log(trainNo);
      let alertMessage = response.train.alertMsg;
      if(currentStation.length != 0) {
        stationDisplayed = currentStation[0].title.split('(')[0];
        stationCode = currentStation[0].title.split('(')[1].slice(0, -1);
        delay = response.stations.filter(station => station.source_code === stationCode)[0].delay_arrival;
        console.log(stationCode);
      }
      else {
        stationDisplayed = response.stations[response.stations.length-1].source_name;
        delay = response.stations[response.stations.length-1].delay_arrival;
      }
      if(delay < 0 && Math.abs(delay)>=60) {
        delay = 24*60 - Math.abs(delay);
      }
      if(delay <= 0){
        msg = 'Train ' +  trainName + '        is currently at ' + stationDisplayed + ' station and is right on time.';
      } else if(delay < 60) {
        msg = 'Train ' +  trainName + '        is currently at ' + stationDisplayed + ' station and is late by ' + delay + ' minutes';
      } else {
        msg = 'Train ' +  trainName + '        is currently at ' + stationDisplayed + ' station and is late by ' + parseInt(delay/60) + ' hours and ' + delay%60 + ' minutes';
      }
      if(alertMessage)
        msg = alertMessage;
    }
    else {
      msg = 'Sorry, no train found by this train number. Please try again.';
    }
    return msg;
  }
};
