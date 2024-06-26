import { useState, useEffect } from 'react';

// this component renders a text input field for city selection and a list of suggestions
const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [query, setQuery] = useState("");
   const [suggestions, setSuggestions] = useState([]);

   // update the suggestions state with the allLocations prop passed from the App component
   useEffect(() => {
      setSuggestions(allLocations);
   }, [`${allLocations}`]);
   // stringify the allLocations prop to disentangle the complex data type of allLocations from the memory address,
   // this avoids infinite loop

   // filter the locations based on the user input
   const handleInputChanged = (event) => {
      const value = event.target.value;
      const filteredLocations = allLocations ? allLocations.filter((location) => {
         return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }) : [];

      setQuery(value);
      setSuggestions(filteredLocations);

      // add the info alert if the user input does not match any of the locations, added Apr10/2024
      let infoText;
      if (filteredLocations.length === 0) {
         infoText = "We can not find the city you are looking for. Please try another city"
      } else {
         infoText = ""
      }
      setInfoAlert(infoText);
   };

   // set the query state to the value of the clicked item and hide the suggestions list
   const handleItemClicked = (event) => {
      const value = event.target.textContent;  // get the text content of the clicked item
      setQuery(value);                         // set the query state to the value of the clicked item
      setShowSuggestions(false); // to hide the list
      setCurrentCity(value); // set the currentCity state to the value of the clicked item
      setInfoAlert(""); // if someone clicks on a suggestion, the info alert should disappear
   };

   // this UI component renders a text input field and a list of suggestions
   return (
      <div data-testid="city-search" id="city-search">
         <input
            type="text"
            className="city"
            placeholder="Search for a city"
            value={query}
            onFocus={() => setShowSuggestions(true)}
            onChange={handleInputChanged}
            data-testid="city-input"
         />
         {showSuggestions ?
            <ul className="suggestions">
               {suggestions.map((suggestion) => {
                  return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
               })}
               <li key='See all cities' onClick={handleItemClicked}>
                  <b>See all cities</b>
               </li>
            </ul>
            : null
         }
      </div>
   )
}

export default CitySearch;