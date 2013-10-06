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
