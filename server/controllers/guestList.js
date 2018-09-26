var mongoose = require("mongoose");
//instantiate guestlist model
var GuestList = mongoose.model("GuestList");
var errors = [];
var uuid = require("uuid");
var _ = require("lodash");
module.exports = {
  index: function(req, res) {
    GuestList.find({}, function(err, guestlistall) {
      // res.json([{name:'Tyler'}, {name:'Joe'}]);
      res.json(guestlistall);
    });
  },
  create: function(req, res) {
    // console.log("create req.body", req.body);
    // var names = JSON.parse(req.body.names);
    // console.log("names***", req.body.names);
    var names = req.body.names;
    var errors = [];
    for (var i = 1; i < names.length; i++) {
      // console.log("this name", names[i]);
      let party = names[i];
      var partyNames = party.slice(0, names[i].length - 2);
      var count = party.slice(names[i].length - 2, names[i].length - 1);
      count = parseInt(count[0]);
      if (partyNames.length > 0) {
        var partyNames = partyNames[0].split(",");
        var newNames = _.map(partyNames, function(name) {
          return name.trim();
        });
        console.log("count", count);
        console.log("partynames", newNames);
        var guestlist = new GuestList({ _id: uuid(), party: newNames, guestCount: count });
        guestlist.save(function(err) {
          if (err) {
            console.log("err in create", err);
            console.log("something went wrong");
            for (var x in err.errors) {
              errors.push(x);
            }
            // console.log('errors in create', errors)
          }
        });
      }
    }
    if (errors.length > 0) {
      res.json({ status: false, errors: errors });
    } else {
      console.log("successfully added guestlist");
      res.json({ status: true });
    }
  },
  destroy: function(req, res) {
    console.log("req.params.id in destroy", req.params.id);
    GuestList.remove({ _id: req.params.id }, function(err, guestlist) {
      console.log("guestlist in destroy", guestlist);
      res.redirect("/");
    });
  },
  searchname: function(req, res) {
    console.log("controller req name", req.body);
    var name = req.body.name;
    var errors = [];
    var pattern = "" + name + "\\b";
    var regex = new RegExp(pattern, "i");
    GuestList.find({ party: { $in: [regex] } }, function(err, foundname) {
      console.log("found name in controller*****", foundname);
      if (err) {
        console.log("err in search", err);
        for (var x in err.errors) {
          errors.push(x);
        }
        res.json({ status: false, errors: errors });
        console.log("error searching", err);
      } else {
        res.json({ status: true, result: foundname });
      }
    });
  }
};
