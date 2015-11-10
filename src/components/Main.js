require('normalize.css');
require('styles/App.scss');

import React from 'react';
import CalendarStore from '../stores/CalendarStore';
import EventStore from '../stores/EventStore';
import CalendarActions from '../actions/CalendarActions';
import EventActions from '../actions/EventActions';
import CalendarHeader from './CalendarHeader';
import Calendar from './Calendar';

class AppComponent extends React.Component {
	constructor() {
    super();
    this.state = this.getState();
    this.onChange = this.onChange.bind(this);
  }

  getState() {
  	return {
  		calendar: CalendarStore.getState(),
  		events: EventStore.getState()
  	}
  }

  componentDidMount() { 
  	CalendarStore.listen(this.onChange);
  	EventStore.listen(this.onChange);
  	EventActions.fetchEvents();
  }

  componentWillUnmount() {
    CalendarStore.unlisten(this.onChange);
    EventStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(this.getState());
  }

  saveEvent(event) {
  	EventActions.addEvent(event);
  }

  deleteEvent(event) {
  	EventActions.deleteEvent(event);
  }

  updatePeriod(diff) {
  	switch (this.state.calendar.selectedTab) {
  		case 1: 
  			CalendarActions.updateDate(diff);
  			break;
  		case 2:
  			CalendarActions.updateWeek(diff);
  			break;
  		case 3:
  			CalendarActions.updateMonth(diff);
  			break;
  	}  	
  }

  selectTab(tab) {
  	CalendarActions.selectTab(tab);
  }

  render() {
    return (
      <div>
        <CalendarHeader 
        	tabs = {this.state.calendar.tabs}
        	selectedTab={this.state.calendar.selectedTab}
        	selectTab={this.selectTab}
        	selectedDay={this.state.calendar.selectedDay}
        	nextPeriod={this.updatePeriod.bind(this, 1)} 
        	previousPeriod={this.updatePeriod.bind(this, -1)} />
        <Calendar 
        	selectedTab={this.state.calendar.selectedTab}
        	selectedDay={this.state.calendar.selectedDay}
        	today={this.state.calendar.today}
        	events={this.state.events.events} 
        	saveEvent={this.saveEvent} 
        	deleteEvent={this.deleteEvent} />
      </div>
    );
  }
}

export default AppComponent;
