import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';

// App component is the parent component that renders the CitySearch, NumberOfEvents, and EventList components
function App() {
   const [events, setEvents] = useState([]);            // 'events' holds the list of events
   const [currentNOE, setCurrentNOE] = useState(32);     // 'currentNOE' holds the number of events to display
   const [allLocations, setAllLocations] = useState([]);  // 'allLocations' holds the list of all locations
   const [currentCity, setCurrentCity] = useState("See all cities");      // 'currentCity' holds the currently selected city
   const [isLoading, setIsLoading] = useState(true);                     // 'isLoading' is flag to indicate if the data is currently being fetched
   const [infoAlert, setInfoAlert] = useState("");                       // 'infoAlert' holds the message to be displayed in the info alert
   const [errorAlert, setErrorAlert] = useState("");                     // 'errorAlert' holds the message to be displayed in the error alert
   const [warningAlert, setWarningAlert] = useState("");                 // 'warningAlert' holds the message to be displayed in the warning alert

   // useeffect hook to fetch the list of events and set the events state when the component mounts, 
   // AND conditionally rerender the component when the currentCity or currentNOE state changes
   useEffect(() => {
      if (navigator.onLine) {
         // set the warning alert message to an empty string ""
         setWarningAlert("");
      } else {
         // set the warning alert message to a non-empty string
         setWarningAlert("You are offline. This list may not be up to date.");
      }
      fetchData();
   }, [currentCity, currentNOE]); // callback of useEffect will be called whenever it detects a change in currentCity or currentNOE

   // Fetch the list of events, filter the events based on the currentCity, set "isLoading" to "true" before fetching the data and "false" after fetching the data
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

   // return the App component with the InfoAlert (if present), CitySearch, NumberOfEvents, and EventList components
   // Pass the allLocations state to the CitySearch component
   // Pass the events state to the EventList component
   return (
      <div className="App">
         <h1>The Meet App</h1>
         <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
         <div className="alerts-container">
            {/* Display the info alert if the infoAlert state is not empty */}
            {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
            {/* Display the error alert if the errorAlert length is not zero */}
            {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
            {/* Display the warning alert if the warningAlert length is not zero */}
            {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
         </div>
         <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
         {isLoading ? (
            <h2 className="loading-message">
               Loading events
               <div className="loading-dots"><span>.</span><span>.</span><span>.</span></div>
            </h2>
         ) : (
            <div className="events-found">
               <div className="charts-container">
                  <EventGenresChart events={events} />
                  <CityEventsChart allLocations={allLocations} events={events} />
               </div>
               <EventList events={events} />
            </div>
         )}
      </div>
   );
}

export default App;
