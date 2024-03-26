import React, { Component } from 'react';

class NumberOfEvents extends Component {
   state = {
      numberOfEvents: 32,
   };

   handleInputChange = (event) => {
      const value = event.target.value;
      this.setState({ numberOfEvents: value });
   }

   render() {
      return (
         <div id="number-of-events">
            <input
               type="text"
               className="number-of-events"
               value={this.state.numberOfEvents}
               onChange={this.handleInputChange}
               role="textbox"
            />
         </div>
      );
   }
}

export default NumberOfEvents;