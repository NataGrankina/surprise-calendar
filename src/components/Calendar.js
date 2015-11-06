require('normalize.css');
require('styles/App.scss');

import React from 'react';
import Month from './Month';
import Week from './Week';
import Day from './Day';
import moment from 'moment';
import { getFirstWeekDay, getLastWeekDay } from '../constants/CalendarConstants';

class CalendarComponent extends React.Component {
  constructor() {
    super();
    this.isSelectedDayEvent = this.isSelectedDayEvent.bind(this);
    this.isSelectedWeekEvent = this.isSelectedWeekEvent.bind(this);
  }

  isSelectedDayEvent(day, event) {
      return (day.isSame(event.start, 'day') || event.start.isBefore(day, 'day')) 
      && (day.isSame(event.end, 'day') || event.end.isAfter(day, 'day'));
  }

  isSelectedWeekEvent(event) {
    var sunday = getFirstWeekDay(this.props.selectedDay);
    var result = false;
    for (var i = 0; i < 7; i++) {
      if (this.isSelectedDayEvent(sunday, event)) {
        result = true;
        break;
      }
      sunday.add(1, 'day');
    }
    return result;
  }

  render() {    
    return (
      <div className="calendar-container">
          {this.props.selectedTab === 3 
            ? <Month selectedDay={this.props.selectedDay} />
            : null}
          {this.props.selectedTab === 2
            ? <Week 
                selectedDay={this.props.selectedDay} 
                today={this.props.today} 
                events={this.props.events.filter(this.isSelectedWeekEvent)} isSelectedDayEvent={this.isSelectedDayEvent} 
                saveEvent={this.props.saveEvent}
              />
            : null}
          {this.props.selectedTab === 1
            ? <Day 
                day={this.props.selectedDay} 
                events={this.props.events.filter(this.isSelectedDayEvent.bind(this, this.props.selectedDay))}
                saveEvent={this.props.saveEvent} 
              />
            : null}
        </div>
    );
  }
}

export default CalendarComponent;




