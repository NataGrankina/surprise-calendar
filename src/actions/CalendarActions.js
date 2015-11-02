var alt = require('../components/Dispatcher');

class CalendarActions {
  updateMonth(diff) {
    this.dispatch(diff);
  }
  updateDate(diff) {
  	this.dispatch(diff);
  }
  updateWeek(diff) {
  	this.dispatch(diff);
  }
  selectTab(tab) {
  	this.dispatch(tab);
  }
}

module.exports = alt.createActions(CalendarActions);