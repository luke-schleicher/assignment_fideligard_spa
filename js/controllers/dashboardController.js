fideligard.controller('DashCtrl', ['$scope', 'dateService', function dashCtrl($scope, dateService) {

  var getStartDate = function() {
    $scope.startDate = dateService.getStartDate();
  };
  getStartDate();
  $scope.startDateInSeconds = $scope.startDate.getTime() / 1000;

  var getEndDate = function() {
    $scope.endDate = dateService.getEndDate();
  };
  getEndDate();
  $scope.endDateInSeconds = $scope.endDate.getTime() / 1000;

  var getCurrentDate = function() {
    $scope.currentDate = dateService.getCurrentDate();
  };
  getCurrentDate();
  $scope.currentDateInSeconds = $scope.currentDate.getTime() / 1000;

  $scope.updateCurrentDate = function() {
    dateService.updateCurrentDate($scope.currentDateInSeconds);
  };
  
}]);
