const NumberOfEvents = ({ setCurrentNOE, currentNOE }) => {  // Create a new component called NumberOfEvents

   const handleInputChange = (event) => {
      const value = event.target.value;           // get the value of the input field and assign to 'value'
      setCurrentNOE(value);   // set the set currentNOE to value entered in the input field
   }

   return (
      <div id="number-of-events">
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