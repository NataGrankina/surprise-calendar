import alt from '../components/Dispatcher';
import EventActions from '../actions/EventActions';
import _ from 'lodash';

class EventStore {
  constructor() { 
  	this.events = [];
    this.errorMessage = null;

  	this.bindListeners({
      handleUpdateEvents: EventActions.UPDATE_EVENTS,
      handleFetchEvents: EventActions.FETCH_EVENTS,
      handleEventsFailed: EventActions.EVENTS_FAILED,
      handleAddEvent: EventActions.ADD_EVENT,
      handleDeleteEvent: EventActions.DELETE_EVENT
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

  handleAddEvent(event) {
    this.events.push(event);
    this.errorMessage = null;
  }

  handleDeleteEvent(eventId) {
    _.remove(this.events, event => event._id === eventId);
    this.errorMessage = null;
  }
}

module.exports = alt.createStore(EventStore, 'EventStore');