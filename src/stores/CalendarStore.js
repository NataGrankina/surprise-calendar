import alt from '../components/Dispatcher';
import CalendarActions from '../actions/CalendarActions';
import CaledarConstants from '../constants/CalendarConstants';

class CalendarStore {
  constructor() { 
  	this.today = new Date();
  	this.selectedDay = this.today;

  	this.tabs = [
    	{ 'id': 1, 'name': 'Day' },
    	{ 'id': 2, 'name': 'Week' },
    	{ 'id': 3, 'name': 'Month' }
	];
	this.selectedTab = 3;

  	this.bindListeners({
      handleUpdateMonth: CalendarActions.UPDATE_MONTH
    }); 
    this.bindListeners({
      handleUpdateWeek: CalendarActions.UPDATE_WEEK
    }); 
    this.bindListeners({
      handleUpdateDate: CalendarActions.UPDATE_DATE
    }); 
    this.bindListeners({
      handleSelectTab: CalendarActions.SELECT_TAB
    }); 
  }

  handleUpdateMonth(diff) {
  	this.selectedDay.setDate(1);
    this.updateMonth(diff);
  }

  updateMonth(diff) {
  	var month = this.selectedDay.getMonth();
  	var year = this.selectedDay.getFullYear();
  	month += diff;
    while (month > 11) {
    	month -= 12;
    	year++;
    }
    while (month < 0) {
    	month += 12;
    	year--;
    }

    this.selectedDay = new Date(year, month, this.selectedDay.getDate());
  }

  handleUpdateWeek(diff) {
  	this.selectedDay.setDate(this.selectedDay.getDate() + diff * 7)
  }

  handleUpdateDate(diff) {
  	this.selectedDay.setDate(this.selectedDay.getDate() + diff);
  }

  handleSelectTab(tab) {
  	this.selectedTab = tab;
  }
}

module.exports = alt.createStore(CalendarStore, 'CalendarStore');