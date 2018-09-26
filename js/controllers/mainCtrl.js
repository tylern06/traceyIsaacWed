myAppModule.controller("mainCtrl", function($scope, $rootScope, mainFactory, $location, $sce) {
  $scope.images = [];
  mainFactory.getImages(function(data) {
    // console.log("All images:", data);
    $scope.images = data;
  });

  //inGallery = false by default
  $scope.clickGallery = function() {
    console.log("gallery clicked");
    $scope.inGallery = true;
    $location.url("/gallery");
    // console.log($scope.inGallery);
  };

  $scope.clickHome = function() {
    // console.log("home clicked");
    $location.url("/");
  };

  $scope.addGuests = function(data) {
    mainFactory.addGuests(data, function(res) {
      console.log("this ", res);
    });
    return "yooo";
  };

  $scope.sendForm = function() {
    console.log("sent form", $scope.form);
    if ($scope.form.guests == undefined) {
      $scope.form.guests = 0;
    }
    mainFactory.sendForm($scope.form, function(data) {
      console.log("received form", data);
      $location.url("/confirmed");
    });
  };

  $scope.searchName = function() {
    console.log("search name is ", $scope.searchform);
    mainFactory.searchName($scope.searchform, function(data) {
      console.log("here are the search name", data);
      if (data.status && data.result.length > 0) {
        //name found
        $("#searchModal").modal("show");
        if (!$(".noResults").hasClass("hideMe")) {
          $(".noResults").addClass("hideMe");
        }
      } else {
        //no name found
        $(".noResults").removeClass("hideMe");
      }
    });
  };

  //add for html src
  // for (var i = 0; i < $scope.images.length; i++) {
  // 	$scope.images[i] = $sce.trustAsResourceUrl($scope.images[i]);
  // }
});

myAppModule.directive("lightgallery", function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      if (scope.$last) {
        console.log("enter lightGallery directive");
        //a tag element attributes
        // console.log('attr', attrs);
        //jqLite-wrapped element of a tag
        // console.log('element', element);

        // ng-repeat is completed
        // element.justifiedGallery();
        // element.parent().justifiedGallery();
        // element.parent().lightGallery();

        setTimeout(function() {
          element
            .parent()
            .justifiedGallery({
              rowHeight: 250,
              maxRowHeight: null,
              margins: 5,
              border: 5,
              rel: "mygallery",
              lastRow: "nojustify",
              captions: true
            })
            .on("jg.complete", function() {
              element.parent().lightGallery();
            });
        }, 5);
      }
    }
  };
});

myAppModule.directive("selectNgFiles", function() {
  return {
    require: "ngModel",
    link: function postLink(scope, elem, attrs, ngModel) {
      elem.on("change", function(e) {
        var files = elem[0].files;
        console.log("files in directive", files);
        var config = {
          delimiter: "", // auto-detect
          newline: "", // auto-detect
          quoteChar: '"',
          escapeChar: '"',
          header: false,
          trimHeaders: false,
          dynamicTyping: false,
          preview: 0,
          encoding: "",
          worker: false,
          comments: false,
          step: undefined,
          complete: onComplete,
          error: undefined,
          download: false,
          skipEmptyLines: false,
          chunk: undefined,
          fastMode: undefined,
          beforeFirstChunk: undefined,
          withCredentials: undefined,
          transform: undefined
        };

        if (files) {
          _.forEach(files, function(file) {
            var reader = new FileReader();
            console.log("reader", reader);
            reader.readAsText(file);
            reader.onload = function(evt) {
              var csvData = evt.target.result;
              Papa.parse(csvData, config);
            };
          });
        }
        //
        function onComplete(result) {
          console.log("json rsvp", result);
          console.log("scope", scope.addGuests(result.data));
        }
        // ngModel.$setViewValue(files);
      });
    }
  };
});
