App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('events');
  this.resource('contact');
});

Handlebars.registerHelper("getAllEventStubs", function() {
   var eventRef = new Firebase("https://cal-poly-hackmit.firebaseio.com/events");
   var s =  "<section id='events'>";
   var headers = false;
   eventRef.on('value', function(snapshot){
      if ( snapshot == null ){
         s += "<h2>Null Title</h2><p>null description</p>";
      }
      snapshot.forEach(function(childSnapshot){
         var childVal = childSnapshot.val();
         var key;
   		var areaCode;
   		var city;
   		var endTime;
   		var name;
   		var startTime;
   		var state;
   		var street;
   		var date;
         
         s += "<div class = 'event'> <img width='200' height='135'/>";
		 
         for ( key in childVal ){
   			if (key == "area-code")
   				return areaCode = childVal[key];
   			else if (key == "city")
   				return city = childVal[key];
   			else if (key == "end-time")
   				return endTime = childVal[key];
   			else if (key == "name")
   				return name = childVal[key];
   			else if (key == "start-time")
   				return startTime = childVal[key];
   			else if (key == "state")
   				return state = childVal[key];
   			else if (key == "street")
   				return street = childVal[key];
   			else if (key == "date")
   				return date = childVal[key];
         }
		 
		   s += "<h2>" + name + "</h2>";
         s += "<p>" + startTime + "</p>";
         s += "<p>" + endTime + "</p>";
         s += "<footer>" + date + "</footer>";
         s += "</div>";
      });
   });
   s += "</section>";
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
