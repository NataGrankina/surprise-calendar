var alt = require('../components/Dispatcher');
import EventSource from '../sources/EventSource';

class EventActions {
  addEvent(event) {
    EventSource.addEvent(event)
      .then((events) => {
        // we can access other actions within our action through `this.actions`
        this.actions.updateEvents(events);
      })
      .catch((errorMessage) => {
        this.actions.eventsFailed(errorMessage);
      });
  }
  
  updateEvents(events) {
    this.dispatch(events);
  }
  fetchEvents() {
  // we dispatch an event here so we can have "loading" state.
    this.dispatch();
    EventSource.fetch()
      .then((events) => {
        // we can access other actions within our action through `this.actions`
        this.actions.updateEvents(events);
      })
      .catch((errorMessage) => {
        this.actions.eventsFailed(errorMessage);
      });
  }
  eventsFailed(errorMessage) {
    this.dispatch(errorMessage);  
  }
}

module.exports = alt.createActions(EventActions);