myAppModule.controller('mainCtrl', function($scope, $rootScope, mainFactory, $location, $sce) {
	$scope.images = [];
	 mainFactory.getImages(function(data){
		console.log("All images:", data );
		$scope.images = data;
	})

	//inGallery = false by default
	$scope.clickGallery = function() {
		console.log('gallery clicked');
		$scope.inGallery = true;
		$location.url('/gallery');
		console.log($scope.inGallery);
	}

	$scope.clickHome = function() {
		console.log('home clicked');
		$location.url('/');
	}

	$scope.sendForm = function() {
		console.log('sent form', $scope.form)
		if($scope.form.guests == undefined) {
			$scope.form.guests = 0;
		}
		mainFactory.sendForm($scope.form, function(data) {
			console.log('received form', data)
			$location.url('/confirmed');
		});
	}

	//add for html src
	// for (var i = 0; i < $scope.images.length; i++) {
	// 	$scope.images[i] = $sce.trustAsResourceUrl($scope.images[i]);
	// }
});

myAppModule.directive('lightgallery', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (scope.$last) {
				console.log('enter lightGallery directive');
				//a tag element attributes
				// console.log('attr', attrs);
				//jqLite-wrapped element of a tag
				// console.log('element', element);

        // ng-repeat is completed
				// element.justifiedGallery();
				// element.parent().justifiedGallery();
        element.parent().lightGallery();

        setTimeout(function(){
          element.parent().justifiedGallery({
            border: 10,
            rowHeight: 250,
            margins: 10,
						captions: false,
          });
        }, 100);

      }
    }
  };
});
