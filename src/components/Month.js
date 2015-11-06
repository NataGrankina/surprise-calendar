require('normalize.css');
require('styles/App.scss');

import React from 'react';
import { Table } from 'react-bootstrap';
import { daysInMonth, shortWeekDays } from '../constants/CalendarConstants';


class MonthComponent extends React.Component {
  render() {
    var selectedDay = this.props.selectedDay;

  	var firstDay = selectedDay.clone().date(1);
  	var startingDay = firstDay.day();
  	var monthLength = selectedDay.daysInMonth();

  	var day = 1;
  	var weeks = [];
  	for (var i = 0; i < 6; i++) {
  		var days = [];
  		for (var j = 0; j <= 6; j++) { 
    		var value = '';
    		if (day <= monthLength && (i > 0 || j >= startingDay)) {
      			value = day;
      			day++;
    		}	
    		days.push(<td>{value}</td>);    
  		}
  		weeks.push(<tr>{days}</tr>);
  		if (day > monthLength) {
    		break;
		}
	}

    return (
      <div>
        <table className="day-names-table">
              <thead>
                <tr>{shortWeekDays.map((weekDay, index) => <td key={index}>{weekDay}</td>)}</tr>
              </thead>
        </table>
      	<Table className="month-table" bordered condensed>
        	<tbody>      		
        			{weeks}
        	</tbody>
        </Table>
      </div>
    );
  }
}

export default MonthComponent;




