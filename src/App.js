import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents} from './api';
import './App.css';

function App() {
   const [events, setEvents] = useState([]);
   const [currentNOE, setCurrentNOE] = useState(32);
   const [allLocations, setAllLocations] = useState([]);  // Declare a state for allLocations
   const [currentCity, setCurrentCity] = useState("See all cities");

   // Initialize the allLocations state with the list of locations from the events list:
   const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
        allEvents :
        allEvents.filter(event => event.location === currentCity)
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    }

   // Fetch the list of events when the component mounts
   useEffect(() => { 
      fetchData();
   }, [currentCity]); // callback of useEffect will be called whenever it detects a change in currentCity

   // return the App component with the CitySearch, NumberOfEvents, and EventList components
   // Pass the allLocations state to the CitySearch component
   // Pass the events state to the EventList component
   return (
      <div className="App">
         <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
         <NumberOfEvents />
         <EventList events={events}/>
      </div>
   );
}

export default App;
