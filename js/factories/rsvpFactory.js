myAppModule.factory("rsvpFactory", function($http) {
  // var orders = [{name: "Michael Choi", product: "Nike Shoes", quantity: '2', date:'April 3rd 2016'}];
  var results = {};
  var factory = {};
  //create add order function
  // factory.searchNames = function(data) {
  //   // console.log('store new order', data)
  //   $http.get("/", data).success(function(output) {
  //     // console.log('output in addorder', output)
  //   });
  // };
  factory.searchName = function(name, callback) {
    name = JSON.stringify(name);
    $http.post("/searchname", name).success(function(output) {
      // results = output;
      callback(output);
    });
  };

  return factory;
});
