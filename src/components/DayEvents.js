require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Overlay, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import EventCreator from './EventCreator';
import Event from './Event';

class DayEventsComponent extends React.Component {  
  constructor() {
    super();
    this.state = {
      newEvent: null,
      eventTargetId: null
    };
    this.clear = this.clear.bind(this);
    this.prepareEvent = this.prepareEvent.bind(this);
  }  

  prepareEvent(hour, minute, clickEvent) {
    this.setState({
      newEvent: {
        start: this.props.day.clone().hour(hour).minute(minute),
        end: this.props.day.clone().hour(hour + 1).minute(minute),
        description: ''
      },
      eventTargetId: clickEvent.target.id
    });
  }

  clear() {
    this.setState({
      newEvent: null
    });
  }

  render() {
    var day = this.props.day;

  	var hours = [];
  	for (var i = 0; i < 24; i++) {  		
      var halfHours = [];
      for (var j = 0; j < 2; j++) {
        halfHours.push(<div id={['time', day.month(), day.date(), i, j].join('-')} className="half-hour-box" onClick={this.prepareEvent.bind(this, i, j * 30)}></div>);
      }
  		hours.push(        
    			<div className="hour-events-box">
            {halfHours}
    			</div>
        );
  	}

    return (
    		<div className="day-events">
          <Overlay
            show={this.state.newEvent}
            onHide={this.clear}
            placement="top" 
            target={() => document.getElementById(this.state.eventTargetId)}>
            <Popover title="Event">            
              <EventCreator 
                event={this.state.newEvent} 
                close={this.clear} 
                saveEvent={this.props.saveEvent} />            
            </Popover>
          </Overlay>
          {hours}
          {this.props.events.concat(this.state.newEvent ? [this.state.newEvent] : []).map(event => 
            <Event day={this.props.day} event={event} />)}
        </div>
    );
  }
}

export default DayEventsComponent;

