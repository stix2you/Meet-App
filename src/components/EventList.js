import Event from './Event';

// this component will render a list of Event components, each formatted in Event component
const EventList = ({ events }) => {
   
   // if events is not null, map through the events and render an Event component for each event
   return (
      <ul id="event-list">
        {events ? events.map(event => (
          <li key={event.id}><Event event={event} /></li>
        )) : null}
      </ul>
    );
}

export default EventList;