var http = require ("http");
var url = require ("url");
var fs = require ("fs");
var querystring = require("querystring");
var file = 'form.html';

http.createServer (function (request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url_parts = url.parse (request.url, true);  // parsing (relative) URL
    if (url_parts.pathname == '/submit' && request.method == 'GET') {  // Processing the form content, if the relative URL is '/ submit'
      let query_index = request.url.indexOf('?');
      let query = request.url.substring(query_index + 1);
      var welcome = 'Witaj ' + querystring.parse(query)['imie'];
      response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
      response.write(welcome); // Data (response) that we want to send to a web browser
      response.end(); // Sending the answer
      console.log("The server sent the '"+welcome+"' text to the browser");
    }
    else if (url_parts.pathname == '/submit' && request.method == 'POST') {  // Processing the form content, if the relative URL is '/ submit'
      let body = '';
      request.on('readable', function() {
        body += request.read();
      });
      request.on('end', function() {
        // console.log(querystring.parse(body)['imie']);
        let params = querystring.parse(body);
        var welcome = 'Witaj ' + querystring.parse(body)['imie'];
        welcome = welcome.substring(0, welcome.length -  4);
        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        response.write(welcome); // Data (response) that we want to send to a web browser
        response.end(); // Sending the answer
      });
      console.log("The server sent the '"+welcome+"' text to the browser");
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
