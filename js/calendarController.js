angular.module('calendar')
.controller('CalendarController', function($rootScope){
    getEvents();
    $rootScope.page_sub_title = 'Invite';
});