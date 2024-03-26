import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

describe('<Event /> component', () => {
   let EventComponent;
   let allEvents;

   // fetches the list of events and renders the Event component before each test
   beforeAll(async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
   });

   // tests that the Event component renders the event title, start time, and location
   test('renders event title', () => {
      expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
   });
   test('renders event start time', () => {
      expect(EventComponent.queryByText(allEvents[0].start.dateTime)).toBeInTheDocument();
   });
   test('renders event location', () => {
      expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
   });

   // tests that the event details are hidden by default and that the 'Show Details' button is rendered
   test('by default, the event details are hidden', () => {
      expect(EventComponent.queryByText('Hide Details')).not.toBeInTheDocument();
   });

   // tests that the 'Show Details' button is rendered and 
   test("shows the details section when the user clicks on the'Show Details' button", async () => {
      userEvent.click(EventComponent.queryByText('Show Details'));
      expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
   });

   test("hides the details section when the user clicks on the'Hide Details' button", async () => {
      userEvent.click(EventComponent.queryByText('Hide Details'));
      expect(EventComponent.queryByText('Hide Details')).not.toBeInTheDocument();
   });

   test('renders event details with the description', () => {
      expect(EventComponent.queryByText(allEvents[0].description)).toBeInTheDocument();
   });
});
