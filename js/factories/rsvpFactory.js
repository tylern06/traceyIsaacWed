myAppModule.factory("rsvpFactory", function($http) {
  // var orders = [{name: "Michael Choi", product: "Nike Shoes", quantity: '2', date:'April 3rd 2016'}];
  var results = {};
  var factory = {};

  factory.searchName = function(name, callback) {
    name = JSON.stringify(name);
    $http.post("/searchname", name).success(function(output) {
      // results = output;
      callback(output);
    });
  };

  factory.sendForm = function(formData, callback) {
    console.log("in sendform factory", formData);
    $http.post("/rsvp", formData).success(function(output) {
      callback(output);
    });
  };

  return factory;
});
