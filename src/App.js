import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents} from './api';
import './App.css';

function App() {
   const [events, setEvents] = useState([]);
   const [currentNOE, setCurrentNOE] = useState(32);

   // populate the events state with the events list we fetch
   const fetchData = async () => {
      const allEvents = await getEvents();    // Fetch the list of events 
      setEvents(allEvents.slice(0, currentNOE));   // Set the events state to the first 32 events (or currentNOE)
   }

   // Fetch the list of events when the component mounts
   useEffect(() => { 
      fetchData();
   }, []);

   // return the App component with the CitySearch, NumberOfEvents, and EventList components
   // Pass the events state to the EventList component
   return (
      <div className="App">
         <CitySearch />
         <NumberOfEvents />
         <EventList events={events}/>
      </div>
   );
}

export default App;
