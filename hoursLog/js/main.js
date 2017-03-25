$(document).ready();
  var config = {
    apiKey: "AIzaSyBijlCIat04X7HthdnqddouCaQa_tyBbAo",
    authDomain: "workhourslog-e08ba.firebaseapp.com",
    databaseURL: "https://workhourslog-e08ba.firebaseio.com",
    storageBucket: "workhourslog-e08ba.appspot.com",
    messagingSenderId: "781791465838"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var hoursData = {};

  var totalTime;
// On submit capture all user data and then push to db
  $('button').on('click', function(e){
  	e.preventDefault();

  	hoursData.day = $('#days').val();
  	hoursData.date = $('#startDate').val();
  	hoursData.hours = $('#hours').val();
  	hoursData.minutes = $('#minutes').val();

  	hoursData.totalTime = hoursData.hours + '.' + hoursData.minutes;
  	hoursData.completeTotals = (hoursData.hours * 60 + hoursData.minutes) / 60;
  	// total = (hoursData.hours * 60 + hoursData.minutes) / 60;


  	$('#startDate').val('');
// create a section for comments data in your db
  	var hoursDataReference = database.ref('hoursLog');
//Hoping to capture the uniq Id of each item
 
// use the set method to save data to the comments
  		hoursDataReference.push(hoursData);

  });

  function getHoursLog() {
  	//request user input from db on results
  	database.ref('hoursLog').on('value', function(results){

  		var dailyLog = results.val();
  		var hoursLog = [];

  		for (var item in dailyLog) {
  			var context = {
  					day: dailyLog[item].day,
  					date: dailyLog[item].date,
  					hours: dailyLog[item].hours,
  					minutes: dailyLog[item].minutes,
  					totalTime: dailyLog[item].totalTime,
  					orderId: item
  			};
  			var source = $('#template').clone().html();
  			var template = Handlebars.compile(source);
  			var newUserInput = template(context);
  			
  		//elements to add to the end of the array
  			hoursLog.push(newUserInput)
  		}

  		for (var i in hoursLog) {
			$('.entries').append(hoursLog[i]);

  	}
  });
  }
  getHoursLog();

function dateSelector() {

// }
// $(function() {
    $('.date-picker').on('click', datepicker( {
        changeMonth: true,
        changeYear: true,
        changeDate: true,
        showButtonPanel: true,
        dateFormat: 'MM dd yy',
        onClose: function(dateText, inst) { 
            
            
            
            function isDonePressed(){
                            return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
                        }

                        if (isDonePressed()){

                            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                            var date = $("#ui-datepicker-div .ui-datepicker-date :selected").val();
                            $(this).datepicker('setDate', new Date(year, date, month, 1));
                             console.log('Done is pressed')

                        }
            
            
          
        }
    }));
};



