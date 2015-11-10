import alt from '../components/Dispatcher';
import CalendarActions from '../actions/CalendarActions';
import moment from 'moment';

class CalendarStore {
  constructor() { 
  	this.today = moment();
  	this.selectedDay = moment();

  	this.tabs = [
    	{ 'id': 1, 'name': 'Day' },
    	{ 'id': 2, 'name': 'Week' },
    	{ 'id': 3, 'name': 'Month' }
	];
	this.selectedTab = 3;

  	this.bindListeners({
      handleUpdateMonth: CalendarActions.UPDATE_MONTH,
      handleUpdateWeek: CalendarActions.UPDATE_WEEK,
      handleUpdateDate: CalendarActions.UPDATE_DATE,
      handleSelectTab: CalendarActions.SELECT_TAB
    }); 
  }

  handleUpdateMonth(diff) {
  	this.selectedDay.date(1);
    this.updateMonth(diff);
  }

  updateMonth(diff) {
  	var month = this.selectedDay.month();
  	var year = this.selectedDay.year();
  	month += diff;
    while (month > 11) {
    	month -= 12;
    	year++;
    }
    while (month < 0) {
    	month += 12;
    	year--;
    }

    this.selectedDay = moment({
    	year: year, 
    	month: month,
    	date: this.selectedDay.date()
    });
  }

  handleUpdateWeek(diff) {
  	this.selectedDay.add(diff, 'week');
  }

  handleUpdateDate(diff) {
  	this.selectedDay.add(diff, 'day');
  }

  handleSelectTab(tab) {
  	this.selectedTab = tab;
  }
}

module.exports = alt.createStore(CalendarStore, 'CalendarStore');