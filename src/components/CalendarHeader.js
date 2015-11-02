require('normalize.css');
require('styles/App.scss');

var CalendarStore = require('../stores/CalendarStore');
var CalendarConstants = require('../constants/CalendarConstants');

import React from 'react';
import { NavBrand, Navbar, NavItem, Nav, ButtonGroup, Button } from 'react-bootstrap';

class CalendarHeaderComponent extends React.Component {
  render() {	
    var selectedDay = this.props.selectedDay;
    var year = selectedDay.getFullYear();
    var month = selectedDay.getMonth();
    var date = selectedDay.getDate();

    var sunday = new Date(
      selectedDay.getFullYear(), 
      selectedDay.getMonth(),
      selectedDay.getDate());
    sunday.setDate(selectedDay.getDate() - selectedDay.getDay());

    var saturday = new Date(
      sunday.getFullYear(), 
      sunday.getMonth(),
      sunday.getDate());
    saturday.setDate(selectedDay.getDate() + 5);

    var selectedWeekDay = CalendarConstants.fullWeekDays[selectedDay.getDay()];
    var selectedTab = this.props.selectedTab;
    return (         
      <Navbar>
        {this.props.selectedTab === 3 
            ? <NavBrand><a>{CalendarConstants.month[month]} {year}</a></NavBrand>
            : null}
        {this.props.selectedTab === 2 
            ? <NavBrand><a>{sunday.toDateString()} - {saturday.toDateString()}</a></NavBrand>
            : null}
        {this.props.selectedTab === 1 
            ? <NavBrand><a>{selectedWeekDay}, {CalendarConstants.month[month]} {date}, {year}</a></NavBrand>
            : null}
        <Nav>
          <NavItem eventKey={1} href="#" onClick={this.props.previousPeriod}>Previous</NavItem>
          <NavItem eventKey={2} href="#" onClick={this.props.nextPeriod}>Next</NavItem>
        </Nav>
         <Nav right>
          <NavItem eventKey={3} href="#">
            <ButtonGroup>
              {this.props.tabs.map(tab => 
                <Button 
                  key={tab.id}
                  active={(this.props.selectedTab === tab.id)}
                  onClick={this.props.selectTab.bind(null, tab.id)}>
                  {tab.name}
                </Button>
              )}
            </ButtonGroup>
          </NavItem>
         </Nav>
       </Navbar>
    );
  }
}

export default CalendarHeaderComponent;




