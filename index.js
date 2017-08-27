var http = require('http');
var xml = require('xml');
var port = process.env.PORT || 5000

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(xml({response: [{
      playtext: 'Hey i am Himanshu testing this api'
    }]}));
}).listen(port);

console.log(port);
