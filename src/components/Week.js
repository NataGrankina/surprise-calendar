require('normalize.css');
require('styles/App.scss');

import CalendarConstants from '../constants/CalendarConstants';

import React from 'react';
import { Col } from 'react-bootstrap';
import DayEvents from './DayEvents';
import DayHours from './DayHours';

class WeekComponent extends React.Component {
  render() {
    var selectedDay = this.props.selectedDay;

    var sunday = new Date(
      selectedDay.getFullYear(), 
      selectedDay.getMonth(),
      selectedDay.getDate());
    sunday.setDate(selectedDay.getDate() - selectedDay.getDay());

    var dayHeaders = [], days = [];
    for (let i = 0; i < 7; i++) { 
      selectedDay.setDate(selectedDay.getDate() + 1);    
      dayHeaders.push(<td key={i}>{CalendarConstants.shortWeekDays[i]} {selectedDay.toLocaleDateString()}</td>); 
      days.push(<div className="week-day-events-container"><DayEvents /></div>);
    }
    
    return (
      <div>
        <Col className="day-names-container" lg={11} md={11} sm={11} xs={11} lgOffset={1} mdOffset={1} smOffset={1} xsOffset={1}>
            <table className="day-names-table">
              <thead>
                <tr>{dayHeaders}</tr>
              </thead>
            </table>
        </Col>  
        <Col className="hours-container" lg={1} md={1} sm={1} xs={1}>
          <DayHours />
        </Col>
        <Col className="events-container" lg={11} md={11} sm={11} xs={11}>
          {days}
        </Col>
      </div>
    );
  }
}

export default WeekComponent;




