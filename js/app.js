(function(){

var app = angular.module('calendar', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.page_sub_title = 'Login';
});

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/login", {
        templateUrl : "partials/login.html",
        controller: 'LoginController',
        controllerAs: 'ctrl'
    })
    .when("/calendar", {
        templateUrl : "partials/calendar.html",
        controller: 'CalendarController',
        controllerAs: 'ctrl'
    })
    .otherwise({
        redirectTo: "/login"
    });
}]);

})();

var eventData = {};
var list_of_events = [];
var userEmail = null;