require('normalize.css');
require('styles/App.scss');

var CalendarStore = require('../stores/CalendarStore');

import React from 'react';
import { NavBrand, Navbar, NavItem, Nav, ButtonGroup, Button } from 'react-bootstrap';
import { getFirstWeekDay, getLastWeekDay } from '../constants/CalendarConstants';

class CalendarHeaderComponent extends React.Component {
  render() {	
    var selectedDay = this.props.selectedDay;
    var sunday = getFirstWeekDay(selectedDay);
    var saturday = getLastWeekDay(selectedDay);

    var selectedTab = this.props.selectedTab;
    return (         
      <Navbar>
        {this.props.selectedTab === 3 
            ? <NavBrand><a>{selectedDay.format("MMMM YYYY")}</a></NavBrand>
            : null}
        {this.props.selectedTab === 2 
            ? <NavBrand><a>{sunday.format("ddd, MMMM D, YYYY")} - {saturday.format("ddd, MMMM D, YYYY")}</a></NavBrand>
            : null}
        {this.props.selectedTab === 1 
            ? <NavBrand><a>{selectedDay.format("dddd, MMMM Do YYYY")}</a></NavBrand>
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




