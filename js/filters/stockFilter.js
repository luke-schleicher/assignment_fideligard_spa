fideligard.filter('stockFilter', function() {

  return function(collection, search) {

    if (!search) { return collection; }

    var filteredCollection = {};

    angular.forEach(collection, function(stock, key) {
      if (stock.symbol.indexOf(search) !== -1) {
        filteredCollection[key] = stock;
      }
    });

    return filteredCollection;

  };

});