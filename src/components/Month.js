require('normalize.css');
require('styles/App.scss');

import React from 'react';
import { Table } from 'react-bootstrap';
import BriefDayEvents from './BriefDayEvents';
import EventHelper from '../helpers/EventHelper';
import moment from 'moment';


class MonthComponent extends React.Component {
  render() {
    var selectedDay = this.props.selectedDay;

  	var currentDay = selectedDay.clone().date(1);
  	var startingDay = currentDay.day();
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

        var isToday = currentDay.isSame(this.props.today, 'day');

    		days.push(
          <td key={i + '-' + j} className={isToday ? "current-day" : ""}>
            <div className="date">{value}</div>
            <div className="day-events">
              <BriefDayEvents 
                events={this.props.events.filter(EventHelper.doesEventBelongToDay.bind(null, currentDay.clone()))} 
                deleteEvent={this.props.deleteEvent}
                maxHeight={70} />
            </div>
          </td>); 
        currentDay.date(day);   
  		}
  		weeks.push(<tr key={i}>{days}</tr>);
  		if (day > monthLength) {
    		break;
		}
	}

    return (
      <div>
        <table className="day-names-table">
              <thead>
                <tr>{moment.weekdaysShort().map((weekDay, index) => <td key={index}>{weekDay}</td>)}</tr>
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




