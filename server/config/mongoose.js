var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");

//connect to mongoose
mongoose.connect("mongodb://localhost/traceyguestlist");

var models_path = path.join(__dirname, "./../models");

fs.readdirSync(models_path).forEach(function(file) {
  if (file.indexOf(".js") >= 0) {
    require(models_path + "/" + file);
  }
});
