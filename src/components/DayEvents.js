require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Overlay, Popover, Button } from 'react-bootstrap';
import EventCreator from './EventCreator';
import Event from './Event';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const HOUR_HEIGHT = 40;

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
  	for (var i = 0; i < HOURS_IN_DAY; i++) {  		
      var halfHours = [];
      for (var j = 0; j < 2; j++) {
        halfHours.push(
          <div 
            key={i + '-' + j} 
            id={['time', day.month(), day.date(), i, j].join('-')} 
            className="half-hour-box" 
            onClick={this.prepareEvent.bind(this, i, j * MINUTES_IN_HOUR / 2)}>
          </div>);
      }
  		hours.push(        
    			<div key={i} className="hour-events-box">
            {halfHours}
    			</div>
        );
  	}

    var isToday = day.isSame(this.props.today, 'day');

    return (
    		<div className={isToday ? "day-events current-day" : "day-events"}>
          <Overlay
            show={!!this.state.newEvent}
            onHide={this.clear}
            placement="top" 
            target={() => document.getElementById(this.state.eventTargetId)}>
            <Popover id={this.props.day.day()} title="Event">            
              <EventCreator 
                event={this.state.newEvent} 
                close={this.clear} 
                saveEvent={this.props.saveEvent} />            
            </Popover>
          </Overlay>
          {hours}
          {this.props.events.concat(this.state.newEvent ? [this.state.newEvent] : []).map(event => {
            let top = 0;
            let isEventStartDay = this.props.day.isSame(event.start, 'day');
            if (isEventStartDay) {
              top = HOUR_HEIGHT * (event.start.hour() + event.start.minute() / MINUTES_IN_HOUR);
            }

            let height;
            if (this.props.day.isSame(event.end, 'day')) {
                if (isEventStartDay) {
                  height = event.end.diff(event.start, 'minutes') / MINUTES_IN_HOUR * HOUR_HEIGHT;          
                }
                else {
                  height = HOUR_HEIGHT * (event.end.hour() + event.end.minute() / MINUTES_IN_HOUR);
                }
            }
            else {
              height = HOURS_IN_DAY * HOUR_HEIGHT - top;
            }
            return (
              <Event 
                key={event._id || 0} 
                event={event}
                deleteEvent={this.props.deleteEvent}
                top={top}
                height={height} />) })
          }
        </div>
    );
  }
}

export default DayEventsComponent;

