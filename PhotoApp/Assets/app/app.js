var app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'home',
    'ui.bootstrap'
]);




app.config(['$provide', '$routeProvider', '$httpProvider', function ($provide, $routeProvider, $httpProvider) {

    //================================================
    // Routes
    //================================================
    $routeProvider.when('/home', {
        templateUrl: 'App/Home',
        controller: 'homeCtrl'
    }).otherwise({
        redirectTo: '/home'
    });
}]);

app.run(['$http', '$cookies', '$cookieStore', function ($http, $cookies, $cookieStore) {
    //If a token exists in the cookie, load it after the app is loaded, so that the application can maintain the authenticated state.
    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('_Token');
    $http.defaults.headers.common.RefreshToken = $cookieStore.get('_RefreshToken');
}]);


//GLOBAL FUNCTIONS - pretty much a root/global controller.
app.run(['$rootScope', '$http', '$cookies', '$cookieStore', function ($rootScope, $http, $cookies, $cookieStore) {
         
  
}]);

