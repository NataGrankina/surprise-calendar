require('normalize.css');
require('styles/App.scss');

import React from 'react';
import moment from 'moment';

class EventComponent extends React.Component { 
  render() {
  	var event = this.props.event;

    let top = 0;
    if (this.props.day.isSame(event.start, 'day')) {
      top = 40 * (event.start.hour() + event.start.minute() / 60);
    }

    let height;
    if (this.props.day.isSame(event.end, 'day')) {
        if (this.props.day.isSame(event.start, 'day')) {
          height = event.end.diff(event.start, 'minutes') / 60 * 40;          
        }
        else {
          height = 40 * (event.end.hour() + event.end.minute() / 60);
        }
    }
    else {
      height = 24 * 40 - top;
    }

    let eventStyle = {
      top: top + 'px',
      height: height + 'px'
    };

    return (
     <div className="event" style = {eventStyle}>{event.description || 'no description'}</div>
    );
  }
}

export default EventComponent;

