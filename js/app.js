App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('contact');
  this.resource('events');
});

Handlebars.registerHelper("getAllEventsTable", function() {
   var eventRef = new Firebase("https://cal-poly-hackmit.firebaseio.com/events");
   var s =  "<table class='table'>";
   var headers = false;
   eventRef.on('value', function(snapshot){
      if ( snapshot == null ){
         s += "<tr><td>null</td></tr>";
      }
      snapshot.forEach(function(childSnapshot){
         var childVal = childSnapshot.val();
         var key;
         s += "<tr>";
         if (headers == false){
            for ( key in childVal ){
               s += "<td><b>" + key + "</b></td>";
            }
            s += "</tr><tr>"
            headers = true;
         }
         for ( key in childVal ){
            s += "<td>" + childVal[key] + "</td>";
         }
         s += "</tr>";
      });
   });
   s += "</table>";
   return s;
});

Handlebars.registerHelper("submitNewEvent", function() {
    var eventRef = new Firebase("https://cal-poly-hackmit.firebaseio.com/events");

    var newPushRef = myDataRef.push();
            var name = $('#eventNameInput').val();
            var street = $('#streetInput').val(); 
            var city = $('#cityInput').val();
            var state = $('#stateInput').val(); 
            var zipCode = $('#zipCodeInput').val(); 
            var dateThing = $('#dateInput').val(); 
            var startTime = $('#startTimeInput').val(); 
            var endTime = $('#endTimeInput').val(); 
            var obj = {
              "name":name,
             "street":street,
             "city":city,
             "zip-code":zipCode,
             "state":state,
             "date":dateThing,
             "start-time":startTime,
             "end-time":endTime
            };
            newPushRef.set(obj);    
});
