require('normalize.css');
require('styles/App.scss');

import React from 'react';
import Month from './Month';
import Week from './Week';
import Day from './Day';

class CalendarComponent extends React.Component {
  render() {
    return (
      <div className="calendar-container" data-selected-view="Month">
          {this.props.selectedTab === 3 
            ? <Month data-view="month" selectedDay={this.props.selectedDay} />
            : null}
          {this.props.selectedTab === 2
            ? <Week data-view="week" selectedDay={this.props.selectedDay} />
            : null}
          {this.props.selectedTab === 1
            ? <Day data-view="day" selectedDay={this.props.selectedDay} />
            : null}
        </div>
    );
  }
}

export default CalendarComponent;




