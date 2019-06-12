// No use of the template system
var express = require('express'),
    logger = require('morgan'),
    fs = require('fs'),
    xss = require('xss');
var app = express();
var x = 1;
var y = 2;

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack - each request will be logged in the console in 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' - static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send('<h1>Hello World!</h1><br>' + x + ' + ' + y + ' = ' + parseInt(x + y)); // Send a response to the browser
});

app.get('/add', function (req, res) {
  res.send('3');
});

app.get('/add/:x/:y', function (req, res) {
  res.send('' + (parseInt(req.params.x) + parseInt(req.params.y)));
});

app.get('/math', function (req, res) {
  fs.readFile('math.json', 'utf8', function(err, content) {
      var json_content = JSON.parse(content);
      var response = '';
      for (var i = 0; i < json_content.operations.length; i++){
        var operation = json_content.operations[i];
        console.log(operation);
          if (operation.operation === 'addition'){
            var x = operation.args[0];
            var y = operation.args[1];
            if (x === undefined || y === undefined)
            {
              response += operation.operation + ' takes two args'
            }
            else {
              response += x + ' + ' + y + ' = ' + parseInt(x + y);
            }
          }
          else if (operation.operation === 'subtraction'){
            var x = operation.minued;
            var y = operation.subtrahend;
            if (x === undefined || y === undefined)
            {
              response += operation.operation + ' takes two args'
            }
            else {
              response += x + ' - ' + y + ' = ' + parseInt(x - y);
            }
          }
          else if (operation.operation === 'multiplication'){
            var x = operation.args[0];
            var y = operation.args[1];
            if (x === undefined || y === undefined)
            {
              response += operation.operation + ' takes two args'
            }
            else {
              response += x + ' * ' + y + ' = ' + parseInt(x * y);
            }
          }
          else if (operation.operation === 'division'){
            var x = operation.dividend;
            var y = operation.divisor;
            if (x === undefined || y === undefined)
            {
              response += operation.operation + ' takes two args'
            }
            else {
              if (y === 0){
                response += 'division by 0!!!'
              }
              else {
                response += x + ' / ' + y + ' = ' + parseInt(x / y);
              }
            }
          }
          else{
            response += 'there\'s no operation like ' + xss(operation.operation);
          }
        response += '<br>';
      }
      res.send(response);
  });
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});
