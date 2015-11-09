require('normalize.css');
require('styles/App.scss');

import React from 'react';
import { Col } from 'react-bootstrap';
import DayEvents from './DayEvents';
import DayHours from './DayHours';

class DayComponent extends React.Component {
  render() {
    return (
    	<div className="day-container">
    		<Col className="hours-container" lg={1} md={1} sm={1} xs={1}>
    			<DayHours />
    		</Col>
    		<Col className="events-container" lg={11} md={11} sm={11} xs={11}>
    			<DayEvents 
    				day={this.props.day} 
    				events={this.props.events} 
    				saveEvent={this.props.saveEvent}
    				deleteEvent={this.props.deleteEvent} />
    		</Col>
    	</div>
    );
  }
}

export default DayComponent;




