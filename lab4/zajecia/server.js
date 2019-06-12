var http = require("http");
var url = require("url");
var fs = require('fs');
var fsp = require('fs').promises;

function delete_line(content, line){
  var res = "";
  var lines = content.split("\n");
  for (var i = 0; i < lines.length; i++){
    if (i !== line){
      res += lines[i] + "\n";
    }
  }
  return res;
}

function merge_line(content, line){
  var res = "";
  var lines = content.split("\n");
  for (var i = 0; i < lines.length; i++){
    if (i === line){
      merged_lines = [lines[i].replace(/[\n\r]+/g, ''), lines[i + 1].replace(/[\n\r]+/g, '')].join(' ');
      i += 1;
      res += merged_lines + "\n";
      continue;
    }
    res += lines[i] + "\n";
  }
  return res;
}

http.createServer(function(request, response) {
    /*
      ,,request'' - input stream - contains data received from the browser, e.g. encoded contents of HTML form fields

      ,,response'' - output stream - put in it data that you want to send back to the browser.
         The answer sent by this stream must consist of two parts: the header and the body.
         The header contains, among others, information about the type (MIME) of data contained in the body.
         The body contains the correct data, e.g. a form definition.

    */
    console.log("--------------------------------------")
    console.log("The relative URL of the current request: "+request.url+"\n")
    var url_parts = url.parse(request.url,true); //parsing (relative) URL

    if(url_parts.pathname == '/submit') { //Processing the form content, if the relative URL is '/ submit'
        var name=url_parts.query['name']; //Read the contents of the field (form) named 'name'
        var line_operation = url_parts.query['line_operation'];
        var line = parseInt(line_operation.split(':')[0], 10);
        var operation = line_operation.split(':')[1];
        console.log('line: ' + line + "\noperation: " + operation);
        console.log("Creating a response header")
        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});  //Creating an answer header - we inform the browser that the body of the answer will be plain text
        console.log("Creating the body of the response");

        (async() => {

        try {
            const stat = await fsp.lstat(name);
            if (stat.isFile()){
              // response.write(fs.readFile(name, 'utf8', 'r'));
              fs.readFile(name, (err, data) => {
                if (err) throw err;
                if (operation === "delete"){
                  var new_content = delete_line(data.toString('utf8'), line);
                  fs.writeFile(name, new_content, function(err, data) {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                  });
                }
                else if (operation === "merge"){
                  var new_content = merge_line(data.toString('utf8'), line);
                  fs.writeFile(name, new_content, function(err, data) {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                  });
                }
                response.end();
              });
            }
            else{
              response.write("sciezka reprezentuje katalog");
              response.end();
            }
        } catch(err) {
            console.error(err);
        }
        })();
        console.log("Sending a response")
    }
    else { //Generating the form
        console.log("Creating a response header")
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
        //and now we put an HTML form in the body of the answer
            console.log("Creating a response body")
        response.write('<form method="GET" action="/submit">');
        response.write('<label for="name">filename</label>');
        response.write('<input name="name">');
        response.write('<br>');
        response.write('<label for="line_operation">line:operation</label>');
        response.write('<input name="line_operation">');
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('</form>');
        response.end();  //The end of the response - send it to the browser
        console.log("Sending a response")
    }
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");
