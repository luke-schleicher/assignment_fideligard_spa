fideligard.factory('dateService', function() {

  var dateToString = function(date) {
    return date.toISOString().slice(0, 10);
  };

  var startDate = new Date("Jan 1, 2016");
  var endDate = new Date("Dec 31, 2016");
  var currentDate = new Date("July 1, 2016");
  var currentDateString = dateToString(currentDate);

  var _dates = [];

  var initializeDateObject = function() {
    var date = startDate;
    var count = 0;
    while (date <= endDate) {
      var fullDate = dateToString(date);
      _dates.push(fullDate)
      date = new Date(date.getTime() + 86400000);
    }
  };

  var getDateList = function() {
    return _dates;
  };

  var getStartDate = function() {
    return startDate;
  };

  var getEndDate = function() {
    return endDate;
  };

  var getCurrentDate = function() {
    return currentDate;
  };

  var getCurrentDateString = function() {
    return currentDateString;
  };

  var updateCurrentDate = function(seconds) {
    var mils = seconds * 1000;
    currentDate.setTime(mils);
    currentDateString = dateToString(currentDate);
    console.log(currentDateString);
  };

  return {
    getStartDate: getStartDate,
    getEndDate: getEndDate,
    getCurrentDate: getCurrentDate,
    getCurrentDateString: getCurrentDateString,
    updateCurrentDate: updateCurrentDate,
    initializeDateObject: initializeDateObject,
    getDateList: getDateList,
    dateToString: dateToString
  };

});
