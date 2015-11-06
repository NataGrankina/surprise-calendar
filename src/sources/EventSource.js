import moment from 'moment';
var id = 1;
var events = [];

var EventSource = {
  fetch: function() {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      setTimeout(function () {
        // resolve with some mock data
        resolve(events);
      }, 250);
    });
  },
  addEvent: function(event) {
    return new Promise(function (resolve, reject) {
      event.id = id++;
      events.push(event);
      setTimeout(function () {
        resolve(events);
      }, 250);
    });
  }
};

export default EventSource;