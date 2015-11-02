require('normalize.css');
require('styles/App.scss');

import React from 'react';


class DayEventsComponent extends React.Component {
  render() {
  	var events = [];
  	for (var i = 0; i < 24; i++) {  		
  		events.push(
  			<div className="hour-events-box">
  				<div className="half-hour-box"></div>
  			</div>);
  	}
    return (
    		<div>{events}</div>
    );
  }
}

export default DayEventsComponent;




