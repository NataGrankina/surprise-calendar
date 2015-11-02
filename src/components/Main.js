require('normalize.css');
require('styles/App.scss');

import React from 'react';
import CalendarStore from '../stores/CalendarStore';
import CalendarActions from '../actions/CalendarActions';
import CalendarHeader from './CalendarHeader';
import Calendar from './Calendar';

class AppComponent extends React.Component {
	constructor() {
    super();
    this.state = CalendarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() { 
  	CalendarStore.listen(this.onChange);
  }

  componentWillUnmount() {
    CalendarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  updatePeriod(diff) {
  	switch (this.state.selectedTab) {
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
        	tabs = {this.state.tabs}
        	selectedTab={this.state.selectedTab}
        	selectTab={this.selectTab}
        	selectedDay={this.state.selectedDay}
        	nextPeriod={this.updatePeriod.bind(this, 1)} 
        	previousPeriod={this.updatePeriod.bind(this, -1)} />
        <Calendar 
        	selectedTab={this.state.selectedTab}
        	selectedDay={this.state.selectedDay} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
