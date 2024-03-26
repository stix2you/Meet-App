import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

describe('<Event /> component', () => {
   let EventComponent;
   let firstEvent;

   // Fetches the list of events and renders the Event component before all tests
   beforeAll(async () => {
      const allEvents = await getEvents();
      firstEvent = allEvents[0]; // Save the first event for use in all tests
      console.log("firstEvent after getting declared in event.test.js:", firstEvent);
      EventComponent = render(<Event event={firstEvent} />); // Render the Event component with the first event
   });

      // Tests that the Event component renders the event title
   test('renders event title', () => {
      console.log("event title in test:", firstEvent.summary)
      expect(EventComponent.queryByText(firstEvent.summary)).toBeInTheDocument(); // Check that the DOM element contains the event title
   });

   // Tests that the Event component renders the event start time
   test('renders event start time', async () => {
      console.log("event date/time in test:", firstEvent.created)
      expect(EventComponent.queryByText(firstEvent.created)).toBeInTheDocument();
    });

   // Tests that the Event component renders the event location
   test('renders event location', () => {
      console.log("event location in test:", firstEvent.location)
      expect(EventComponent.queryByText(firstEvent.location)).toBeInTheDocument(); // Check that the DOM element contains the event location
   });

   // tests that the event details are hidden by default and that the 'Show Details' button is rendered
   test('by default, the event details are hidden', () => {
      const details = EventComponent.container.querySelector('.details');
      expect(details).not.toBeInTheDocument();
   });

   // tests that the 'Show Details' button is rendered and 
   test("shows the details section when the user clicks on the'Show Details' button", async () => {
      const user = userEvent.setup();
      const button = EventComponent.queryByText('Show Details');
      await user.click(button);
      const details = EventComponent.container.querySelector('.details');
      expect(details).toBeInTheDocument();
   });

   test("hides the details section when the user clicks on the'Hide Details' button", async () => {
      const user = userEvent.setup();
      const showButton = EventComponent.queryByText('Show Details');
      const hideButton = EventComponent.queryByText('Hide Details');
      user.click(hideButton);
      expect(showButton).toBeInTheDocument();
      expect(hideButton).not.toBeInTheDocument();
   });
});
