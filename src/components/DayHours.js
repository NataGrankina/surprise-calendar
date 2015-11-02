require('normalize.css');
require('styles/App.scss');

import React from 'react';


class DayHoursComponent extends React.Component {
  render() {
  	var events = [];
  	var hours = [];
    for (var i = 0; i < 24; i++) {      
      hours.push(<div className="hour-box">{i}:00</div>);
    }
    return (
    		<div>{hours}</div>
    );
  }
}

export default DayHoursComponent;




