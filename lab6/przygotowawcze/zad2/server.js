var http = require ("http");
var url = require ("url");
var date = require("date-and-time");

http.createServer (function (request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    // var url_parts = url.parse (request.url, true);  // parsing (relative) URL
    let now = new Date();
    let cr_date = date.format(now, 'HH:mm:ss MMM DD YYYY');
    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    response.write("Data: " + cr_date); // Data (response) that we want to send to a web browser
    response.end(); // Sending the answer
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");
