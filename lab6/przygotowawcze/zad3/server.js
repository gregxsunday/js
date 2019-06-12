var http = require ("http");
var url = require ("url");
var fs = require ("fs");
var querystring = require("querystring");
var file = 'index.html';
var date = require("date-and-time");
var dateFromTimezone = require("date-from-timezone");

http.createServer (function (request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url_parts = url.parse (request.url, true);  // parsing (relative) URL
    if (url_parts.pathname == '/date'){
      let now = new Date();
      let getShanghaiDate = dateFromTimezone("Asia/Shanghai");
      let cr_shanghai_date = getShanghaiDate(now);
      console.log(cr_shanghai_date.toISOString());
      let now_shanghai = new Date(cr_shanghai_date);
      let cr_date = date.format(now_shanghai, 'HH:mm:ss DD.MM.YYYY');
      response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
      response.write(cr_date); // Data (response) that we want to send to a web browser
      response.end(); // Sending the answer
    }
    else{
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
    }
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");
