import { useState } from 'react';

// this component renders an event with a title, date, location, and description
const Event = ({ event }) => {

   const [showDetails, setShowDetails] = useState(false);  // this used to show or hide the event details

   return (
      <li className="event">
         <h1 className="event-title">{event && event.summary}</h1>
         <p className="event-date-time">{event && event.created}</p>
         <p className="event-location">{event && event.location}</p>
         <div>
            {/* Conditionally render details based on showDetails */}
            {showDetails && (<p className="event-description">{event && event.description}</p>)}
            {/* Button to toggle showDetails */}
            <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
         </div>
      </li>
   );
}

export default Event;
