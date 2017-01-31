fideligard.controller('StockDataCtrl', ['$scope', 'stockService', 'dateService', function StockDataCtrl($scope, stockService, dateService) {

  $scope.prepareStockData = function() {
    stockService.prepareStockData()
      .then(function(response) {
        $scope.stockData = response;
        $scope.currentDateObject = dateService.getCurrentDate();
        $scope.currentDateString = dateService.getCurrentDateString();
        $scope.initStockDisplay();
      });
  };
  $scope.prepareStockData();

  $scope.$watch('currentDateObject', function() {
    $scope.currentDateString = dateService.getCurrentDateString();
    $scope.stocks = $scope.stockData[$scope.currentDateString];
  }, true);

  $scope.initStockDisplay = function() {
    $scope.stocks = $scope.stockData[$scope.currentDateString];

  };

}]);