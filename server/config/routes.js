var mongoose = require("mongoose");
//go back up 2 folders and to controllers/cats rotues
var guestList = require("../controllers/guestList.js");

module.exports = function(app) {
  //display all users
  app.get("/guestlist", function(req, res) {
    guestList.index(req, res);
  });

  app.post("/addguests", function(req, res) {
    // console.log("req body", req.body);
    guestList.create(req, res);
  });

  app.post("/guestlist/:id", function(req, res) {
    guestList.destroy(req, res);
  });

  // app.get('/display', function(req,res){
  // 	names.displayName(req,res);
  // })
  // // Add a new name
  // app.post('/users', function (req, res) {
  // 	//req.body is for form
  // 	//req.params is from url
  // 	console.log('req params in routes',req.body)
  //   names.create(req,res);
  // })

  // app.post('/users/:id/update', function(req,res){
  // 	console.log('req.body in update routes', req.body)
  // 	names.update(req,res)
  // })

  // app.post('/users/:id', function(req,res){
  // 	names.destroy(req,res);
  // })

  // // app.get('/')
  // app.get('/:name', function(req,res){
  // 	names.jsonName(req,res);
  // })
};
