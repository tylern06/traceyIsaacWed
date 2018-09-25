var myAppModule = angular.module("myApp", ["ngRoute", "ngAnimate"]);

myAppModule.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html"
    })
    .when("/couple", {
      templateUrl: "partials/couple.html"
    })
    .when("/theparty", {
      templateUrl: "partials/theparty.html"
    })
    .when("/lodging", {
      templateUrl: "partials/lodging.html"
    })
    .when("/gallery", {
      templateUrl: "partials/gallery.html"
    })
    .when("/registry", {
      templateUrl: "partials/registry.html"
    })
    .when("/rsvp", {
      templateUrl: "partials/rsvp.html"
    })
    .when("/confirmed", {
      templateUrl: "partials/confirmed.html"
    })
    .when("/manager", {
      templateUrl: "partials/manager.html"
    })
    .otherwise({
      redirectTo: "/"
    });
});
