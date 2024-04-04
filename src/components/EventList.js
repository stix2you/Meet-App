import Event from './Event';

// this component will render a list of Event components, each formatted in Event component
const EventList = ({ events }) => {

   // if events is not null, map through the events and render an Event component WITHIN A LIST ELEMENT for each event 
   // (event components are now returned as individual divs)
   return (
      <ul id="event-list" className="event-list" data-testid="event-list">
         {events ? events.map(event => (
            <li key={event.id}><Event event={event} /></li>
         )) : null}
      </ul>
   );
}

export default EventList;