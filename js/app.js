var fideligard = angular.module('fideligard', ['ui.router']);

fideligard.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('dashboard', {
      url: "/",
      views: {
        'dateSlider': {
          templateUrl: '/js/templates/dateSlider.html',
          controller: 'DashCtrl',
        }
      }
    });

});
