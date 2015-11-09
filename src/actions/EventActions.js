var alt = require('../components/Dispatcher');
import EventSource from '../sources/EventSource';

class EventActions {
  addEvent(event) {
    EventSource.addEvent(event)
      .then(event => {
        this.dispatch(event);
      })
      .catch(errorMessage => {
        this.actions.eventsFailed(errorMessage);
      });
  }

  deleteEvent(event) {
    EventSource.deleteEvent(event)
      .then(event => {
        this.dispatch(event._id);
      })
      .catch(errorMessage => {
        this.actions.eventsFailed(errorMessage);
      });
  }

  updateEvents(events) {
    this.dispatch(events);
  }

  fetchEvents() {
    this.dispatch();
    EventSource.fetch()
      .then((events) => {
        this.actions.updateEvents(events);
      })
      .catch(errorMessage => {
        this.actions.eventsFailed(errorMessage);
      });
  }
  eventsFailed(errorMessage) {
    this.dispatch(errorMessage);  
  }
}

module.exports = alt.createActions(EventActions);