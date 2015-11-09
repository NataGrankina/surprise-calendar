import moment from 'moment';

function doesEventBelongToDay(day, event) {
      return (day.isSame(event.start, 'day') || event.start.isBefore(day, 'day')) 
      && (day.isSame(event.end, 'day') || event.end.isAfter(day, 'day'));
}
function doesEventBelongToWeek(weekDay, event) {
    var day = weekDay.clone().startOf('week');
    var result = false;
    for (var i = 0; i < 7; i++) {
      if (doesEventBelongToDay(day, event)) {
        result = true;
        break;
      }
      day.add(1, 'day');
    }
    return result;
}
function doesEventBelongToMonth(monthDay, event) {
	var day = monthDay.clone().startOf('month');
	var result = false;
    for (var i = 0; i < day.daysInMonth(); i++) {
      if (doesEventBelongToDay(day, event)) {
        result = true;
        break;
      }
      day.add(1, 'day');
    }
    return result;
}

var EventHelper = {
	doesEventBelongToDay: doesEventBelongToDay,
  	doesEventBelongToWeek: doesEventBelongToWeek,
  	doesEventBelongToMonth: doesEventBelongToMonth
};

export default EventHelper;