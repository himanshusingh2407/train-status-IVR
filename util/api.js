var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//https://api.railbeeps.com/api
module.exports = {
  //Calls the api using GET method and returns the JSON response
  callApi: function(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", process.env.api + url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
  }
};
