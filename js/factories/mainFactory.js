myAppModule.factory("mainFactory", function($http) {
  var images = [];
  var factory = {};
  factory.getImages = function(callback) {
    $http.get("/images").success(function(output) {
      images = output.result;
      images.forEach(function(item) {
        // console.log(item);
      });
      callback(images);
    });
  };

  factory.addGuests = function(data, callback) {
    let obj = {
      names: data
    };
    obj = JSON.stringify(obj);
    // console.log("in add guests", obj);
    $http.post("/addguests", obj).success(function(result) {
      console.log("result", result);
      callback("shart");
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
