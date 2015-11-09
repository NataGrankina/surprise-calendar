require('normalize.css');
require('styles/App.scss');

import React from 'react';
import Event from './Event';

const EVENT_HEIGHT = 20;
const DIFF = 2;

class BriefDayEventsComponent extends React.Component {
  render() {
    var events = [];
    for (var i = 0; i < this.props.events.length; i++) {
        var top = i * (EVENT_HEIGHT + DIFF);
        if (i + 1 < this.props.events.length && (i + 1) * (EVENT_HEIGHT + DIFF) + EVENT_HEIGHT > this.props.maxHeight) {
            let style = {
              top: top + 'px'
            };
            events.push(<div key="remainder" className="remainder" style={style}>and {this.props.events.length - i} more...</div>);
            break;
        }
        var event = this.props.events[i];
        events.push(<Event 
            key={event._id || 0} 
            event={event}
            top={top}
            deleteEvent={this.props.deleteEvent}
            height={EVENT_HEIGHT} />);
    }
    return (
    <div>
    	{events}
    </div>
    );
  }
}

export default BriefDayEventsComponent;




