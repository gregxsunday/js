var http = require ("http");
var url = require ("url");
var fs = require ("fs");
var querystring = require("querystring");
var file = 'index.html';

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}

http.createServer (function (request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url_parts = url.parse (request.url, true);  // parsing (relative) URL
    if (url_parts.pathname == '/point' && request.method == 'POST') {  // Processing the form content, if the relative URL is '/ submit'
      let body = '';
      request.on('readable', function() {
        body = request.read();
      });
      request.on('end', function() {
        // console.log(body.substring(0, body.length - 4));
        // var n = querystring.parse(body)['n'];
        // n = n.substring(0, n.length - 4);
        // console.log(n);
        response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        let x = randomInt(0, 300);
        let y = randomInt(0, 300);
        response.write('{"x" : ' + x + ', "y" : ' + y + '}'); // Data (response) that we want to send to a web browser
        response.end(); // Sending the answer
      });
    //   console.log("The server sent the '"+welcome+"' text to the browser");
    }
    else if (url_parts.pathname == '/colors' && request.method == 'POST') {  // Processing the form content, if the relative URL is '/ submit'
      let body = '';
      request.on('readable', function() {
        body += request.read();
      });
      request.on('end', function() {
        console.log(body.substring(0, body.length - 4));
        var n = querystring.parse(body)['n'];
        n = n.substring(0, n.length - 4);
        console.log(n);
        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        let resp = '';
        for (let i = 0; i < parseInt(n, 10); i++){
            let r = randomInt(0, 0xff).toString(16);
            if (r.length < 2){
                r = '0' + r;
            }
            let g = randomInt(0, 0xff).toString(16);
            if (g.length < 2){
                g = '0' + g;
            }
            let b = randomInt(0, 0xff).toString(16);
            if (b.length < 2){
                b = '0' + b;
            }
            resp += '#' + r + g + b + ',';
        }
        response.write(resp.substring(0, resp.length - 1)); // Data (response) that we want to send to a web browser
        response.end(); // Sending the answer
      });
    //   console.log("The server sent the '"+welcome+"' text to the browser");
    }
    else { // Sending, to the browser, the contents of a file (an HTML document) with the name contained in the variable 'file'
        fs.stat(file, function (err,stats) {
          if (err == null) { // If the file exists
              fs.readFile (file, function (err, data) { // Read it content
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                response.write(data);   // Send the content to the web browser
                response.end();
              });
          }
          else { // If the file does not exists
              response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
              response.write('The ' + file + ' file does not exist');
              response.end();
          } //else
        }); //fs.stat
    } //else
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");
