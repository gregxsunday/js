function fibonacci(n) {
  var myWorker = new Worker("worker.js");
  myWorker.onmessage = function (oEvent) {
    console.log("fibonacci(" + n + ")=" + oEvent.data);
  };
  myWorker.postMessage(n);
    // if (n === 0) return 0;
    // else if (n === 1 || n === 2) return 1;
    // else if (n > 2) {
    //     var a = 1;
    //     var b = 1;
    //     var c = 0;
    //     for (var i = 0; i < n - 2; i++) {
    //         c = a + b;
    //         a = b;
    //         b = c;
    //     }
    //     return c;
    // }
}
var interval_end = 0;

function funInterval(){
  let n = Math.pow(2, 30);
  console.log("funInterval():")
  fibonacci(n);

  console.log(" took " + (performance.now() - interval_end) + " milliseconds.");
  interval_end = performance.now();
}

var timeout_end = 0;

function funTimeout(){
  let n = Math.pow(2, 30);
  let res = fibonacci(n);
  console.log("funTimeout():\nfibonacci(" + n + ")=" + res + " took " + (performance.now() - timeout_end) + " milliseconds.");
  timeout_end = performance.now();
  timeoutID = setTimeout("funTimeout()", 2000);
}

var request_end = 0;

function funRequest(){
  let n = Math.pow(2, 30);
  let res = fibonacci(n);
  console.log("funRequest():\nfibonacci(" + n + ")=");
  console.log(" frequency " + (1000/(performance.now() - timeout_end)).toFixed(2) + " Hz.");
  request_end = performance.now()
  requestID = window.requestAnimationFrame(funRequest);
}
var intervalID;
var timeoutID;
var requestID;

function iterate(){
  console.log("looping");
  intervalID = setInterval("funInterval()", 2000);
  // timeoutID = setTimeout("funTimeout()", 2000);
  // requestID = window.requestAnimationFrame(funRequest);
}

function stopIterating(){
  console.log("stopping");
  clearInterval(intervalID);
  clearTimeout(timeoutID);
  cancelAnimationFrame(requestID);
}