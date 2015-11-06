import moment from 'moment';
var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const fullWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function daysInMonth(month, year) {		
	var monthLength = days[month];
	if (month === 1) { 
	    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
	      	monthLength = 29;
	    }	
  	}
  	return monthLength;
}

export function getFirstWeekDay(weekDay) {
    return weekDay.clone().subtract(weekDay.day(), 'day');
}

export function getLastWeekDay(weekDay) {
    return weekDay.clone().add(6 - weekDay.day(), 'day');
}