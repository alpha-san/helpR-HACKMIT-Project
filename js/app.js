App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('events');
  this.resource('contact');
});

Handlebars.registerHelper("getAllEventStubs", function() {
   var eventRef = new Firebase("https://cal-poly-hackmit.firebaseio.com/events");
   var s =  "<section class='event-list'>";
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
         
         s += "<div class='event-list'><img width='200' height='135'/>";
		 
         for (key in childVal){
   			if (key === "area-code")
   				areaCode = childVal[key];
   			else if (key === "city")
   				city = childVal[key];
   			else if (key === "end-time")
   				endTime = childVal[key];
   			else if (key === "name")
   				name = childVal[key];	
   			else if (key === "start-time")
   				startTime = childVal[key];
   			else if (key === "state")
   				state = childVal[key];
   			else if (key === "street")
   				street = childVal[key];
   			else if (key === "date")
   				date = childVal[key];
         }
		 
		 s += "<h2>" + name + "</h2>";
         s += "<p>Start time: " + startTime + "</p>";
         s += "<p>End time: " + endTime + "</p>";
         s += "<p>Date: " + date + "</p>";
         s += "</div>";
      });
   });
   s += "</section>";
   return s;
});

Handlebars.registerHelper("submitNewEvent", function(name, street, city, state, zipCode, dateThing, startTime, endTime, obj) {

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
