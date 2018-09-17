myAppModule.controller('countCtrl', function($scope,$interval) {
    function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(endtime) {
    function updateClock() {
      var t = getTimeRemaining(endtime);
      // console.log(t)
      $scope.days = t.days;
      $scope.hours = ('0' + t.hours).slice(-2);
      $scope.minutes = ('0' + t.minutes).slice(-2);
      $scope.seconds = ('0' + t.seconds).slice(-2);
      // alert($scope.seconds)
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = $interval(updateClock, 1000);
  }
  var today =  new Date()
  //time of day out of 24 hours
  var timeOfday=1000*60*60*18;
  var wedding = new Date(Date.parse('Aug 04 2017') + timeOfday);
  initializeClock(wedding);
});
