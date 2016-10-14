
var googleClientId = '175675808666-ha2dpip2b9tn5te8hdnje9vjfqjfdkhi.apps.googleusercontent.com';
//googleClientId = '175675808666-9a0lm052oeoi8nvmmj3bf8mkcq70hitq.apps.googleusercontent.com';
var googleApiKey = '3hDN6jNQ277RxlMrrAkqHZAk';
//googleApiKey = 'jVt_1XJGK020xYPMAskyFRqJ';
var googleScopes = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.readonly"];

function handleClientLoad()
{
        gapi.client.setApiKey(googleApiKey);
}

function handleAuthResult(authResult)
{
      if (authResult && !authResult.error)
      {
            window.location = '/#/calendar';
            //addEvent();
      }
      else
      {
          alert('Please authorise this application to go further.');
      }
}

function handleAuthClick()
{
        gapi.auth.authorize({client_id: googleClientId, scope: googleScopes, immediate: false}, handleAuthResult);
        return false;
}


function handleEventAuthResult(authResult)
{
      if (authResult && !authResult.error)
      {
        addEventToGCal();
      }
      else
      {
          alert('Please authorise this application to go further.');
      }
}


function handleEventAuthClick()
{
  gapi.auth.authorize({client_id: googleClientId, scope: googleScopes, immediate: false}, handleEventAuthResult);
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
          // location.reload();
        }
        else{
          alert('Oops, there seems to be some trouble creating this event. Please check your data.');
        }

    });
}

function addEventToGCal(eventData){
    gapi.client.setApiKey("");
    // hack from: http://stackoverflow.com/questions/20785327/google-javascript-api-gapi-problems-with-load
    gapi.client.load('calendar', 'v3', addListEventToGCal);
}