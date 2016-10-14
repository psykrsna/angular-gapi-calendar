angular.module('calendar')
.directive('calendarForm', function(){
    return{
        restrict: 'E',
        templateUrl: 'partials/calendar-form.html',
        controller: 'CalendarFormController',
        controllerAs: 'ctrl'
    }
})
.controller('CalendarFormController', function(){

    // jquery hack cause couldn't get angular binding to work on ng-show/ng-hide
    $('#event-creation-form').hide();
    $('#event-creation-prompt').show();

    this.createEvent = function(){
        $('#eventCreationSubmit').val('Creating Event...');
        if($('#eventTitle').val()){ eventData.summary = $('#eventTitle').val(); }
        if($('#eventLocation').val()){ eventData.location = $('#eventLocation').val(); }
        if($('#eventDescription').val()){ eventData.description = $('#eventDescription').val(); }
        if($('#eventAttendees').val()){
            var attendees = $('#eventAttendees').val().split(',');
            eventData.attendees = [];
            for(attendee of attendees){
                eventData.attendees.push({email: attendee});
            }
        }
        eventData.start = { dateTime : $('#eventStart').val() };
        eventData.end = { dateTime : $('#eventEnd').val() };
        eventData.sendNotifications = true;
        addEventToGCal();

        var eventD = {
            title: $('#eventTitle').val(),
            start: $('#eventStart').val(),
            end: $('#eventEnd').val()
        };
        list_of_events.push(eventD);
        reloadCalendar();
    }

    this.resetEverything = function(){
        $('#event-creation-form').trigger('reset');
        reloadCalendar();
        $('#event-creation-form').hide();
        $('#event-creation-prompt').show();
    }

});