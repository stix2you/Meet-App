// this component will allow the user to set the number of events to display on the page
const NumberOfEvents = ({ setCurrentNOE }) => {  

   const handleInputChange = (event) => {
      const value = event.target.value;           // get the value of the input field and assign to 'value'
      setCurrentNOE(value);   // set the set currentNOE to value entered in the input field
   }

   return (
      <div id="number-of-events">
         <label>Number of Events to Display: </label>
         <input
            type="text"
            defaultValue="32"
            className="number-of-events"
            onChange={handleInputChange}
            data-testid="number-of-events-input"
         />
      </div>
   );
}

export default NumberOfEvents;