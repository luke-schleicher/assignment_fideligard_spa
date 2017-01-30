fideligard.factory('dateService', function() {

  var startDate = new Date("Jan 1, 2016");
  var endDate = new Date("Dec 31, 2016");
  var currentDate = new Date("July 1, 2016");

  var getStartDate = function() {
    return startDate;
  };

  var getEndDate = function() {
    return endDate;
  };

  var getCurrentDate = function() {
    return currentDate;
  };

  var updateCurrentDate = function(seconds) {
    var mils = seconds * 1000;
    currentDate = new Date(mils);
    console.log(currentDate);
  };

  return {
    getStartDate: getStartDate,
    getEndDate: getEndDate,
    getCurrentDate: getCurrentDate,
    updateCurrentDate: updateCurrentDate
  };

});
