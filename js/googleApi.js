
var googleClientId = '175675808666-ha2dpip2b9tn5te8hdnje9vjfqjfdkhi.apps.googleusercontent.com';
//googleClientId = '175675808666-9a0lm052oeoi8nvmmj3bf8mkcq70hitq.apps.googleusercontent.com';
var googleApiKey = '3hDN6jNQ277RxlMrrAkqHZAk';
//googleApiKey = 'jVt_1XJGK020xYPMAskyFRqJ';
var googleScopes = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.readonly"];

function handleClientLoad()
{
  gapi.client.setApiKey(googleApiKey);
}

function getEvents()
{
  gapi.client.setApiKey("");
  // hack from: http://stackoverflow.com/questions/20785327/google-javascript-api-gapi-problems-with-load
  gapi.client.load('calendar', 'v3', function(){

    var time_max = new Date();
    time_max.setDate(time_max.getDate()+30);
    var time_min = new Date();
    time_min.setDate(time_min.getDate()-30);

     var request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            //'timeMin': (new Date()).toISOString(),
            'timeMin': time_min.toISOString(),
            'timeMax': time_max.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 200,
            'orderBy': 'startTime'
    });

    request.execute(function(resp) {
            var events = resp.items;
            for(event of events){
              var data = {'title': event.summary, 'start': event.start.dateTime, 'end': event.end.dateTime};
              list_of_events.push(data);
            }
            loadCalendar();
    });

  });
}

function handleAuthResult(authResult)
{
      if (authResult && !authResult.error)
      {
          $('#loginBtn').html('Loading...')
          window.location = '/#/calendar';
      }
      else
      {
          alert('Please authorise this application to go further.');
          $('#loginBtn').html('Login With Google');
      }
}

function handleAuthClick()
{
        gapi.auth.authorize({client_id: googleClientId, scope: googleScopes, immediate: false}, handleAuthResult);
        return false;
}


function addListEventToGCal(){
    var event = eventData;

    var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event
        });

    request.execute(function(event) {
        if(event.htmlLink){
          alert('Event Successfully Created');
          $('#event-creation-form').trigger('reset');
          $('#eventCreationSubmit').val('Insert Invite');
          eventData = {};
        }
        else{
          alert('Oops, there seems to be some trouble creating this event. Please check your data.');
          $('#eventCreationSubmit').html('Insert Invite');
        }
    });
}

function addEventToGCal(){
    gapi.client.setApiKey("");
    // hack from: http://stackoverflow.com/questions/20785327/google-javascript-api-gapi-problems-with-load
    gapi.client.load('calendar', 'v3', addListEventToGCal);
}