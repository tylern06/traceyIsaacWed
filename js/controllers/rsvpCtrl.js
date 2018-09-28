myAppModule.controller("rsvpCtrl", function($scope, rsvpFactory) {
  // $scope.names = [];
  $scope.partyNames = [];
  $scope.selectedParty = "";

  //get initial items
  // function getProducts() {
  //   productFactory.getProducts(function(data) {
  //     $scope.products = data;
  //   });
  // }
  // getProducts();
  //search name from mongodb guestlists
  $scope.searchName = function() {
    console.log("search name is ", $scope.searchform);
    rsvpFactory.searchName($scope.searchform, function(data) {
      console.log("here are the search name", data.result);
      if (data.status && data.result.length > 0) {
        $scope.partyNames = data.result;
        console.log("party names", $scope.partyNames);

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

  $scope.selectName = function(party) {
    $scope.selectedParty = party;
  };

  $scope.joinNames = function(names) {
    return names.join(", ");
  };

  $scope.initials = function(name) {
    if (name) {
      var name = name.split(" ");
      if (name.length > 1) {
        return name[0] + " " + name[1].slice(0, 1) + ".";
      } else if (name.length > 0) {
        return name[0];
      } else {
        return name;
      }
    }
  };

  $scope.incrementIndex = function(index) {
    return (index = index + 1);
  };
  $scope.continueRSVP = function() {
    console.log("continue id", $scope.selectedParty);
    if ($scope.selectedParty) {
      $("#searchModal").modal("hide");
      $("#rsvpModal").modal("show");
    }
    console.log("partyname", $scope.partyNames);
  };
});
