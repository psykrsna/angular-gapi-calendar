angular.module('calendar')
.controller('CalendarController', function($rootScope){

    $rootScope.page_sub_title = 'Invite';
    //this.eventBeingCreated = false;

    this.addEventToCalendar = function(start, end){
        var eventData;
        var title = 'Event';
        if (title) {
            eventData = {
                title: title,
                start: start,
                end: end
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
        $('#calendar').fullCalendar('option', {
            editable: true,
            selectable: false
        });
    }

    $scope = this;

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay'
        },
        defaultDate: Date.now(),
        defaultView: 'agendaWeek',
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
            $scope.addEventToCalendar(start, end);
            //$scope.eventBeingCreated = true;
            $('#event-creation-form').show();
            $('#event-creation-prompt').hide();
            var formatted_start = start.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
            var formatted_end = end.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
            $('#eventStart').val(formatted_start);
            $('#eventEnd').val(formatted_end);
            $('#eventTitle').focus();
        },
        eventResize: function(event, delta, revertFunc){
            var formatted_start = event.start.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
            var formatted_end = event.end.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
            $('#eventStart').val(formatted_start);
            $('#eventEnd').val(formatted_end);
            $('#eventTitle').focus();
        },
        eventDrop: function(event, delta, revertFunc){
            var formatted_start = event.start.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
            var formatted_end = event.end.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
            $('#eventStart').val(formatted_start);
            $('#eventEnd').val(formatted_end);
            $('#eventTitle').focus();
        },
        editable: false,
        timezone: 'local',
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'Meeting',
                start: '2016-10-12T10:30:00',
                end: '2016-10-12T12:30:00'
            }
        ]
    });


});
