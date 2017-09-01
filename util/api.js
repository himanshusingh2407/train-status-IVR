var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
  //Calls the api using GET method and returns the JSON response
  callApi: function(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
  }
};
