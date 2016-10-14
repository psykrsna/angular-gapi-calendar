function saveStartEndOfEvent(start, end){
    var formatted_start = start.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
    var formatted_end = end.format("YYYY-MM-DDTHH:mm:ssZ").replace('A', 'T').replace('P', 'T');
    $('#eventStart').val(formatted_start);
    $('#eventEnd').val(formatted_end);
}

function loadCalendar(){

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
            // create event
            var eventD = {
                    title: 'Event',
                    start: start,
                    end: end
                };
            $('#calendar').fullCalendar('renderEvent', eventD, true); // stick? = true
            $('#calendar').fullCalendar('unselect');
            // make it editable, and nothing else selectable
            $('#calendar').fullCalendar('option', {
                editable: true,
                selectable: false
            });
            // shown invite form
            $('#event-creation-form').show();
            $('#event-creation-prompt').hide();
            $('#eventTitle').focus();
            // store start and end time
            saveStartEndOfEvent(start, end);
        },
        eventResize: function(event, delta, revertFunc){
            saveStartEndOfEvent(event.start, event.end);
            $('#eventTitle').focus();
        },
        eventDrop: function(event, delta, revertFunc){
            saveStartEndOfEvent(event.start, event.end);
            $('#eventTitle').focus();
        },
        editable: false,
        timezone: 'local',
        eventLimit: true, // allow "more" link when too many events
        events: list_of_events
    });

}

function reloadCalendar(){
    $('#calendar').fullCalendar('removeEvents');
    for(event of list_of_events){
        $('#calendar').fullCalendar('renderEvent', event, true);
    }
    // make it selectrable, and nothing editable
    $('#calendar').fullCalendar('option', {
        editable: false,
        selectable: true
    });
}

