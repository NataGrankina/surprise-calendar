require('normalize.css');
require('styles/App.scss');

import React from 'react';
import { FormControls, Input, ButtonGroup, ButtonInput } from 'react-bootstrap';
class EventCreatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }  

  onChange(changeEvent) {
    var event = this.state.event;
    event.description = changeEvent.target.value;
    this.setState({
        event: event
    });
  }

  save() {
    this.props.saveEvent(this.state.event);
    this.props.close();
  }

  render() {
    return (   	
            <form>
                <FormControls.Static 
                    label="When:" 
                    value={this.state.event.start.format("ddd, MMM D YYYY, HH:mm") + ' - ' + this.state.event.end.format(this.state.event.start.isSame(this.state.event.end, 'day') ? "HH:mm" : "ddd, MMM D YYYY, HH:mm")} 
                />
                <Input 
                    type="text" 
                    label="What:" 
                    placeholder="Enter description" 
                    autoFocus={true} 
                    value={this.state.event.description}
                    onChange={this.onChange}
                />
                <ButtonInput bsStyle="success" onClick={this.save}>Save</ButtonInput>
                <ButtonInput bsStyle="primary" onClick={this.props.close}>Close</ButtonInput>
            </form>
    );
  }
}

export default EventCreatorComponent;