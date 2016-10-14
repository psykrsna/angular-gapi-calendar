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
            $('#eventStart').val(start.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T'));
            $('#eventEnd').val(end.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T'));
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
