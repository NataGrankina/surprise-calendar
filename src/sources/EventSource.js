import moment from 'moment';

var EventSource = {
  fetch: function() {
    return new Promise(function (resolve, reject) {
      $.ajax({
       type: "GET",
       dataType: "json",
       url: 'http://localhost:3000/events/',
       success: function (response) {
        var events = response.data;
        events.forEach(event => {
          event.start = moment(event.start);
          event.end = moment(event.end);
        });
        resolve(events);
       },
       error: function (request, textStatus, errorThrown) {
           reject(errorThrown);
       }
      });
    });
  },
  addEvent: function(event) {
    return new Promise(function (resolve, reject) {
      $.ajax({
       type: "POST",
       data: JSON.stringify(event),
       contentType: 'application/json',
       dataType: "json",
       url: 'http://localhost:3000/events',
       success: function (response) {
           if (!response.error) {
            var event = response.data;
            event.start = moment(event.start);
            event.end = moment(event.end);
            resolve(event);
           } else {
            reject(response.message);
           }
       },
       error: function (request, textStatus, errorThrown) {
           reject(errorThrown);
       }
      });
    });
  },
  deleteEvent: function(event) {
    return new Promise(function (resolve, reject) {
      $.ajax({
       type: "DELETE",
       contentType: 'application/json',
       dataType: "json",
       url: 'http://localhost:3000/events/' + event._id,
       success: function (response) {   
          if (!response.error) {        
            resolve(event);
           } 
           else {
            reject(response.message);
           }
       },
       error: function (request, textStatus, errorThrown) {
           reject(errorThrown);
       }
      });
    });
  }
};

export default EventSource;