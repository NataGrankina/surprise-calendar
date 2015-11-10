var alt = require('../components/Dispatcher');
import EventSource from '../sources/EventSource';
import moment from 'moment';

class EventActions {
  addEvent(event) {
    EventSource.addEvent(event)
      .then(event => {
        event.start = moment(event.start);
        event.end = moment(event.end);
        this.dispatch(event);
      })
      .catch(errorMessage => {
        this.actions.eventsFailed(errorMessage);
      });
  }

  deleteEvent(event) {
    EventSource.deleteEvent(event)
      .then(() => {
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
        events.forEach(event => {
          event.start = moment(event.start);
          event.end = moment(event.end);
        });
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