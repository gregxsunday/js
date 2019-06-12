function fibonacci(n) {
    if (n === 0) return 0;
    else if (n === 1 || n === 2) return 1;
    else if (n > 2) {
        var a = 1;
        var b = 1;
        var c = 0;
        for (var i = 0; i < n - 2; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return c;
    }
}

onmessage = function (oEvent) {
  postMessage(fibonacci(oEvent.data));
};