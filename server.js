var express = require("express");
var app = express();
var path = require("path");
var bodyParser= require("body-parser");
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "./node_modules")));
// Setting our Views Folder Directory
app.use(express.static(path.join(__dirname, "./")));

//use pseudo path to equal the full path
app.use('/lightgallerycss', express.static(__dirname + '/node_modules/lightgallery/dist/css')); // redirect lightgallery
app.use('/lightgalleryjs', express.static(__dirname + '/node_modules/lightgallery/dist/js')); // redirect lightgallery
app.use('/lgthumbnailjs', express.static(__dirname + '/node_modules/lg-thumbnail/dist')); // redirect lightgallery
app.use('/lgfullscreenjs', express.static(__dirname + '/node_modules/lg-fullscreen/dist')); // redirect lightgallery
app.use('/uibootstrap', express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist')); // redirect lightgallery

// Setting our Views Folder Directory for EJS
// app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
// app.set('view engine', 'ejs');

// email: fernyhoughwedding@zoho.com
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://pokemongomapper%40gmail.com:pikachu1@smtp.gmail.com');
var ses = require('nodemailer-ses-transport');
var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'fernyhoughwedding@zoho.com',
        pass: 'wyli4792'
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

app.get('/images', function(req, res) {
  var imgs = [];
  var img_path = path.join(__dirname, './img/uploads');
  fs.readdirSync(img_path).forEach(function(file){
    // imgs.push(file);
    // console.log('reading images')
    if (file !== '.DS_Store') {
      imgs.push('img/uploads/'+ file);
    }
  });
  res.json({result: imgs});
})


app.post('/rsvp', function (req,res){
	console.log('rsvp submitted');
	console.log(req.body)
  var info = '';
	// setup e-mail data with unicode symbols
		if(req.body.name.length > 2){
			console.log('mail options');
			var mailOptions = {
  				from: '"RSVP" <fernyhoughwedding@zoho.com>',
			    to: 'deannamdurbin@gmail.com', // list of receivers
			    subject: 'Deanna & Wylie Wedding RSVP', // Subject line
			    text: 'Hey Guys', // plaintext body
			    html: "<table style='border: 1px solid black;border-collapse: collapse;width: 100%;'><tr><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Name</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>RSVP</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'># of Guests</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Song Request</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Allergies</th></tr><tr><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.name + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.rsvp + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.guests + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>"+ req.body.song + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.allergies + "</td></tr></table>"


			};
			//send mail with defined transport object

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
              res.json({status:false})
			    }
          info = info;
			    console.log('Message sent: ' + info.response);
			});
		}
		res.json({status: true, info: info.response});
});

// var port = process.env.PORT || 5000;
var port = 8000;

var server = app.listen(port, function(){
	console.log("********** PORT " + port + " PORT **********")
});
