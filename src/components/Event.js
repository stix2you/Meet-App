import { useState } from 'react';

// this component renders an event with a title, date, location, and description
const Event = ({ event }) => {

   const [showDetails, setShowDetails] = useState(false);  // this used to show or hide the event details

   return (
      <div data-testid="event" className="event">
         <h1 data-testid="event-title" className="event-title">{event && event.summary}</h1>
         <p data-testid="event-date-time" className="event-date-time">{event && event.created}</p>
         <p data-testid="event-location" className="event-location">{event && event.location}</p>
         <div>
            {/* Conditionally render details based on showDetails */}
            {showDetails && (<p data-testid="event-description" className="event-description">{event && event.description}</p>)}
            {/* Button to toggle showDetails */}
            <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
               {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
         </div>
      </div>
   );
}

export default Event;
