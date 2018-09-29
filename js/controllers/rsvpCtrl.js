myAppModule.controller("rsvpCtrl", function($scope, rsvpFactory) {
  // $scope.names = [];
  $scope.partyNames = [];
  $scope.selectedParty = "";

  //METHODS
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

  $("#searchModal").on("shown.bs.modal", function() {
    $(".partyName").click(function(event) {
      var $this = $(event.target).addClass("active");
      $this.siblings().removeClass("active");
      // console.log("this id", $this);
    });
  });

  $("#rsvpModal").on("shown.bs.modal", function() {
    $(".mealSelect").selectpicker();
    $(".mealSelect").selectpicker("refresh");
    $(".mealSelect").on("changed.bs.select", function(e, clickedIndex, isSelected, previousValue) {
      console.log("name has been selected", clickedIndex);
      console.log("is selected", isSelected);
      console.log("selected party", $scope.selectedParty.party[clickedIndex]);
    });
  });

  $scope.sendForm = function() {
    if ($scope.selectedParty) {
      $scope.form.names = $scope.selectedParty.party;
    }

    var rsvp = $("input[name='rsvp']:checked").val();
    console.log("sent form", $scope.form);
    if ($scope.form.guests == undefined) {
      $scope.form.guests = 0;
    }

    $scope.form.rsvp = rsvp;

    rsvpFactory.sendForm($scope.form, function(data) {
      console.log("received form", data);
      if (data.status) {
        $("#rsvpModal").modal("hide");
        $("#confirmModal").modal("show");
        //reset rsvp modal
        $scope.selectedParty = "";
        $scope.partyNames = [];
        $("#findName").val("");
      }

      // $location.url("/confirmed");
    });
  };

  $scope.continueRSVP = function() {
    console.log("continue id", $scope.selectedParty);
    if ($scope.selectedParty) {
      $("#searchModal").modal("hide");
      $("#rsvpModal").modal("show");
    }
    // console.log("partyname", $scope.partyNames);
  };

  //HELPERS
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
        return name[0].slice(0, 1) + "." + name[1].slice(0, 1) + ".";
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
});
