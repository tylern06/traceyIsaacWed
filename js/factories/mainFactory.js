myAppModule.factory('mainFactory', function($http) {
  var images = [];
  var factory = {};
  factory.getImages = function(callback) {
    $http.get('/images').success(function(output) {
      images = output.result;
      images.forEach(function(item){
        // console.log(item);
      })
      callback(images);
    })
  }

  factory.sendForm = function(formData, callback) {
    console.log('in sendform factory', formData)
    $http.post('/rsvp', formData).success(function(output) {
      callback(output)
    })
  }
  return factory;
});
