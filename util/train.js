var date = require('./date.js');
var api = require('./api.js');

function getTrainID(trainNumber) {
  var response = api.callApi("/searchTrains?trainno=" + trainNumber);
  return response[0].id;
}

module.exports = {
  getTrainStatus: function(trainNumber, day) {
    var trainID = getTrainID(trainNumber);
    //console.log(date.getDate(0));
    var response = api.callApi("/getRunningStatus/trainno/" + trainID + "/date/" + date.getDate(day));

    let currentStation = response.markers.filter(station => station.status === 'current')[0].title;
    let stationCode = currentStation.split('(')[1].slice(0, -1);
    let trainName = response.details.name;
    let trainNo = response.details.number;
    console.log(trainNo);
    let delay = response.stations.filter(station => station.source_code === stationCode)[0].delay_arrival;
    return ('Train Number '  + trainNo + '  ' +  trainName + '    The current station is ' + currentStation.split('(')[0] + ' and delay is ' + delay + ' minutes');
  }
};
