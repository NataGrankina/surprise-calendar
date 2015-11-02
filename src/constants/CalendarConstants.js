var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
module.exports = {
	shortMonth: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	shortWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	fullWeekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

	daysInMonth: function(month, year) {		
		var monthLength = days[month];
		if (month === 1) { 
	    	if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
	      		monthLength = 29;
	    	}	
  		}
  		return monthLength;
	}
}