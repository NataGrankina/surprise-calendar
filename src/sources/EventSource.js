import moment from 'moment';

var EventSource = {
  fetch: function() {
    return makeAjaxRequest(
      'http://localhost:3000/events/', 
      'GET', 
      null);
  },
  addEvent: function(event) {
    return makeAjaxRequest(
      'http://localhost:3000/events', 
      'POST', 
      JSON.stringify(event));
  },
  deleteEvent: function(event) {
    return makeAjaxRequest(
      'http://localhost:3000/events/' + event._id, 
      'DELETE', 
      null);
  }
};

function makeAjaxRequest(url, type, data) {
  return new Promise(function (resolve, reject) {
      $.ajax({
       type: type,
       data: data,
       contentType: 'application/json',
       dataType: "json",
       url: url,
       success: function (response) {
          if (!response.error) {
            resolve(response.data);
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

export default EventSource;