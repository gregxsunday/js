var fs = require('fs');
let arg = process.argv[2];

function ls(argument){
  var ret = "";
  fs.stat(argument, function(err, stats){
  if (stats.isFile()){
    console.log("ścieżka reprezentuje plik\n");
    console.log(fs.readFileSync(argument, 'utf8', 'r'));
  }else{
    console.log("ścieżka reprezentuje katalog");
  }
});
};

module.exports = {
  ls
};
