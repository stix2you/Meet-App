import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

function App() {
   const [events, setEvents] = useState([]);
   const [currentNOE, setCurrentNOE] = useState(32);
   const [allLocations, setAllLocations] = useState([]);  // Declare a state for allLocations
   const [currentCity, setCurrentCity] = useState("See all cities");
   const [isLoading, setIsLoading] = useState(true);

   // Fetch the list of events when the component mounts
   useEffect(() => {
      fetchData();
   }, [currentCity, currentNOE]); // callback of useEffect will be called whenever it detects a change in currentCity

   // Initialize the allLocations state with the list of locations from the events list:
   const fetchData = async () => {
      setIsLoading(true);

      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
         allEvents :
         allEvents.filter(event => event.location === currentCity)

      setEvents(filteredEvents.slice(0, currentNOE));   // set the events state to the list of events
      setAllLocations(extractLocations(allEvents));

      setIsLoading(false);
   }

   // return the App component with the CitySearch, NumberOfEvents, and EventList components
   // Pass the allLocations state to the CitySearch component
   // Pass the events state to the EventList component
   return (
      <div className="App">
         <h1>The Meet App</h1>
         <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
         <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
         {isLoading ? (
            <div>Loading events...</div>  // Placeholder for your loading indicator
         ) : (
            <EventList events={events} />
         )}
      </div>
   );
}

export default App;
