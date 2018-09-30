var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var mongoose = require("mongoose");
var _ = require("lodash");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "./node_modules")));
// Setting our Views Folder Directory
app.use(express.static(path.join(__dirname, "./")));

//use pseudo path to equal the full path
app.use("/lightgallerycss", express.static(__dirname + "/node_modules/lightgallery/dist/css")); // redirect lightgallery
app.use("/lightgalleryjs", express.static(__dirname + "/node_modules/lightgallery/dist/js")); // redirect lightgallery
app.use("/lgthumbnailjs", express.static(__dirname + "/node_modules/lg-thumbnail/dist")); // redirect lightgallery
app.use("/lgfullscreenjs", express.static(__dirname + "/node_modules/lg-fullscreen/dist")); // redirect lightgallery
app.use("/papaparse", express.static(__dirname + "/node_modules/papaparse")); // redirect papaparses
app.use("/lodash", express.static(__dirname + "/node_modules/lodash")); // redirect papaparses

// Setting our Views Folder Directory for EJS
// app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
// app.set('view engine', 'ejs');
// Integrate body-parser with our App
// Require path
// this should match the name of the db you are going to use for your project.

// Setting our Static Folder Directory

// app.use(express.static(path.join(__dirname, "./client")));
require("./server/config/mongoose.js");
var routes_setter = require("./server/config/routes.js");
routes_setter(app);
// email: fernyhoughwedding@zoho.com
var nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://pokemongomapper%40gmail.com:pikachu1@smtp.gmail.com');
var ses = require("nodemailer-ses-transport");
var transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "saurwedding@zoho.com",
    pass: "Pumpkin1"
  }
});

// app.get('/', function (req,res){
//   console.log(req.body)
// 	res.render("index");
//  })

//read file works too
// var imgFolder = './client/img';
// fs.readdir(imgFolder, function (err, files) {
//   files.forEach(function(file) {
//     console.log(file);
//   });
// })

app.get("/images", function(req, res) {
  var imgs = [];
  var img_path = path.join(__dirname, "./img/uploads");
  fs.readdirSync(img_path).forEach(function(file) {
    // imgs.push(file);
    // console.log('reading images')
    if (file !== ".DS_Store") {
      imgs.push("img/uploads/" + file);
    }
  });
  res.json({ result: imgs });
});

app.post("/rsvp", function(req, res) {
  console.log("rsvp submitted");
  var food = "";
  var song = "";
  console.log(req.body);
  var guestnames = req.body.names.join(", ");

  if (req.body.filetMignon) {
    var names = req.body.filetMignon.join(", ");
    food = "<h4>Filet Mignon:</h4> " + names + "\n<br>";
  }

  if (req.body.kingSalmon) {
    var names = req.body.kingSalmon.join(", ");
    food += "<h4>King Salmon:</h4> " + names + "\n <br>";
  }
  if (req.body.vegetarian) {
    var names = req.body.vegetarian.join(", ");
    food += "<h4>Vegetarian:</h4> " + names + "\n";
  }

  if (!req.body.song) {
    song = "";
  } else {
    song = req.body.song;
  }

  var info = "";
  // setup e-mail data with unicode symbols
  if (req.body.names.length > 0) {
    console.log("mail options");
    var mailOptions = {
      from: '"RSVP" <saurwedding@zoho.com>',
      to: "tynguyen06@gmail.com, tracen4@gmail.com", // list of receivers
      subject: "Tracey & Isaac Wedding RSVP", // Subject line
      text: "Hey Guys", // plaintext body
      html:
        "<table style='border: 1px solid black;border-collapse: collapse;width: 100%;'><tr><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Guest Names</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>RSVP</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'># of Guests</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Song Request</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Food</th></tr><tr><td style='border: 1px solid black;padding: 15px;text-align: left;'>" +
        guestnames +
        "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" +
        req.body.rsvp +
        "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" +
        req.body.guests +
        "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" +
        song +
        "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" +
        food +
        "</td></tr></table>"
    };
    //send mail with defined transport object

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
        res.json({ status: false });
      }
      info = info;
      console.log("Message sent: " + info.response);
    });
  }
  res.json({ status: true, info: info.response });
});

// var port = process.env.PORT || 5000;
var port = 8000;

var server = app.listen(port, function() {
  console.log("********** PORT " + port + " PORT **********");
});
