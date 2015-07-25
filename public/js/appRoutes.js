angular.module('appRoutes', [])
  .config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        template: 'views/index.html',
        controller: 'MainController'
      });

    $locationProvider.html5Mode(true);

  }]);