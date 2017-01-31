fideligard.factory('stockService', ['dateService', '$http', '$q', function(dateService, $http, $q) {

  var _assembleEndpoint = function(symbol) {

    // Cached Data

    var endpoint = "../../data/" +
    symbol.toLowerCase() +
    ".json";

    // Live API

    // var endpoint = "http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22";
    // endpoint += symbol;
    // endpoint += "%22%20and%20startDate%20=%20%222016-01-01%22%20and%20endDate%20=%20%222016-12-31%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=";

    return endpoint;
  };

  var _symbols = [
    'ABT',
    'GOOG',
    'BDX',
    'CVS',
    'XOM',
    'JNJ',
    'LOW',
    'MSFT',
    'SFM',
    'UTX'
  ];


  var getStockData = function() {

    var requests = [];
    var stocks = [];

    for (var i = 0; i < _symbols.length; i++) {
      var endpoint = _assembleEndpoint(_symbols[i]);
      requests.push($http({
        url: endpoint
      }));

    }

    return $q.all(requests)
      .then(function(response) {

        for (var i = 0; i < response.length; i++) {
          stocks.push(response[i].data.query.results.quote);
        }
        console.log(stocks);
        return stocks;

      }, function(response) {
        console.log(response);
      });

  };

  var storeData = function(stocks) {
    var returnedData = {};

    for (var i = 0; i < stocks.length; i++) {
      for (var j = 0; j < stocks[i].length; j++) {

        var date = "" + stocks[i][j]["Date"];
        var symbol = stocks[i][j]["Symbol"];
        var price = stocks[i][j]["Close"];

        if (stocks[i][j + 1]) {
          var oneDay = price - stocks[i][j + 1]["Close"];
        } else {
          var oneDay = "N/A";
        }

        if (stocks[i][j + 7]) {
          var sevenDays = price - stocks[i][j + 7]["Close"];
        } else {
          var sevenDays = "N/A";
        }

        if (stocks[i][j + 30]) {
          var thirtyDays = price - stocks[i][j + 30]["Close"];
        } else {
          var thirtyDays = "N/A";
        }

        var obj = returnedData[date] || {};

        obj[symbol] = { 'symbol': symbol, 'price': price, '1 day ago': oneDay, '7 days ago': sevenDays, '30 days ago': thirtyDays };
        returnedData[date] = obj;

      }
    }
    return returnedData;
  };

  var scrubData = function(data) {

    var dates = dateService.getDateList();

    for (var i = 0; i < dates.length; i++) {
      if (data[dates[i]] === undefined) {
        do {
          var decrement = 1;
          var dateIndex = i - decrement;
          var newDate = dates[dateIndex];
          data[dates[i]] = angular.copy(data[newDate])
          decrement++;
        } while (newDate === undefined && dateIndex >= 0);
      }
    }
    return data;
  }

  var prepareStockData = function() {
    return getStockData()
      .then(function(stocks) {
        return storeData(stocks)
      })
      .then(function(data) {
        return scrubData(data);
      });        
  };

  return {
    prepareStockData: prepareStockData
  };

}]);