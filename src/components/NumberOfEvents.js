// this component will allow the user to set the number of events to display on the page
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

   const handleInputChange = (event) => {
      const value = event.target.value;           // get the value of the input field and assign to 'value'
      let errorText;                             // declare a variable to hold the error message
      
      // handle error conditions, and decide whether to update currentNOE state:
      if (value < 1 || value > 32 || isNaN(value)) {
         errorText = "Only positive numbers between 1 and 32 are allowed";
         setErrorAlert(errorText);   // set the errorAlert state to the errorText
      } else {
         errorText = "";
         setErrorAlert(errorText);   // set the errorAlert state to an empty string
         setCurrentNOE(value);   // set the set currentNOE to value entered in the input field
      }
   }

   return (
      <div data-testid="number-of-events" id="number-of-events">
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