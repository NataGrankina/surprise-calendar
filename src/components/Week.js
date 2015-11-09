require('normalize.css');
require('styles/App.scss');

import moment from 'moment';

import React from 'react';
import { Col } from 'react-bootstrap';
import DayEvents from './DayEvents';
import DayHours from './DayHours';
import EventHelper from '../helpers/EventHelper'

class WeekComponent extends React.Component {
  render() {
    var today = this.props.today;
    var day = this.props.selectedDay.clone().startOf('week');

    var dayHeaders = [], days = [];
    for (var i = 0; i < 7; i++) {   
      dayHeaders.push(<td key={i}>{day.format("ddd M/D")}</td>); 
      days.push(
        <div key={i} className="week-day-events-container">
          <DayEvents             
            day={day.clone()} 
            saveEvent={this.props.saveEvent} 
            deleteEvent={this.props.deleteEvent}
            events={this.props.events.filter(EventHelper.doesEventBelongToDay.bind(null, day.clone()))}
          />
        </div>);
      day.add(1, 'day');
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




