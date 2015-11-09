require('normalize.css');
require('styles/App.scss');

import React from 'react';
import Month from './Month';
import Week from './Week';
import Day from './Day';
import moment from 'moment';
import EventHelper from '../helpers/EventHelper';

class CalendarComponent extends React.Component {
  render() {    
    var day = this.props.selectedDay;
    return (      
      <div className="calendar-container">
          {this.props.selectedTab === 3 
            ? <Month 
                selectedDay={this.props.selectedDay}
                events={this.props.events.filter(EventHelper.doesEventBelongToMonth.bind(null, day.clone()))}
                deleteEvent={this.props.deleteEvent} />
            : null}
          {this.props.selectedTab === 2
            ? <Week 
                selectedDay={this.props.selectedDay} 
                today={this.props.today} 
                events={this.props.events.filter(EventHelper.doesEventBelongToWeek.bind(null, day.clone()))} 
                saveEvent={this.props.saveEvent}
                deleteEvent={this.props.deleteEvent} />
            : null}
          {this.props.selectedTab === 1
            ? <Day 
                day={this.props.selectedDay} 
                events={this.props.events.filter(EventHelper.doesEventBelongToDay.bind(null, day.clone()))}
                saveEvent={this.props.saveEvent}
                deleteEvent={this.props.deleteEvent} />
            : null}
        </div>
    );
  }
}

export default CalendarComponent;




