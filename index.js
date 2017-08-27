var http = require('http');
var xml = require('xml');
var port = process.env.PORT || 5000

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(xml({response: [{
      playaudio: 'https://himanshusingh2407.github.io/IVR/despacito.mp4'}, {
      playtext: 'Hey i am Himanshu'
    }]}));

    // response.set('Content-Type', 'text/xml');
    // res.send(xml('<response><playaudio>https://himanshusingh2407.github.io/IVR/despacito.mp4</playaudio><playtext>Hey i am Himanshu</playtext><hangup/></response>'));

}).listen(port);

console.log(port);
