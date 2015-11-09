require('normalize.css');
require('styles/App.scss');

import React from 'react';
import moment from 'moment';

class EventComponent extends React.Component { 
  render() {
  	var event = this.props.event;

    let eventStyle = {
      top: this.props.top + 'px',
      height: this.props.height + 'px'
    };

    return (
      <div className="event" style = {eventStyle}>
        {event.description || 'no description'}
        <div className="event-delete" onClick={this.props.deleteEvent.bind(null, event)}>x</div>
      </div>
    );
  }
}

export default EventComponent;

