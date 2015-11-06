import alt from '../components/Dispatcher';
import EventActions from '../actions/EventActions';
import CaledarConstants from '../constants/CalendarConstants';

class EventStore {
  constructor() { 
  	this.events = [];
    this.errorMessage = null;

  	this.bindListeners({
      handleUpdateEvents: EventActions.UPDATE_EVENTS,
      handleFetchEvents: EventActions.FETCH_EVENTS,
      handleEventsFailed: EventActions.EVENTS_FAILED
    }); 
  }

  handleUpdateEvents(events) {
    this.events = events;
    this.errorMessage = null;
  }

  handleFetchEvents() {
    this.events = [];
  }

  handleEventsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(EventStore, 'EventStore');