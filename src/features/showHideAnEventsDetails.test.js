import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

   test('An event element is collapsed by default.', ({ given, when, then }) => {

      given('the user has just opened the app to the default view', async () => {
         render(<App />);
      });

      when('the initial list of events is displayed', async () => {
         // Wait for the App to fetch events and update the UI, using disappearance of a loading text as an indicator
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });

         // Confirm that at least one event is displayed by checking for the presence of event title test id
         const eventTitles = await screen.findAllByTestId('event-title');
         expect(eventTitles.length).toBeGreaterThan(0); // Check that there is at least one event title
      });

      then('they should be displayed in a collapsed format for readability', async () => {
         const details = screen.queryAllByTestId('event-description');  // Get all the details sections
         expect(details.length).toBe(0);  // Assuming details are only rendered when expanded, none should be present initially
      });
   });

   test('User can expand an event to see details.', ({ given, when, then }) => {
      let firstEventDetailsButton;

      given('there is any list of collapsed events', async () => {
         render(<App />);  // Render the app to get the list of events

         // Wait for the App to fetch events and update the UI, using disappearance of a loading text as an indicator
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });

         // Confirm that at least one event is displayed by checking for the presence of event title test id
         const eventTitles = await screen.findAllByTestId('event-title');
         expect(eventTitles.length).toBeGreaterThan(0); // Check that there is at least one event title

         // assign the "Show Details" button for the first event to simulate click on it later
         firstEventDetailsButton = screen.getAllByText('Show Details')[0];
      });

      when('the user clicks on "show details" button', async () => {
         // simulate user clicking on "Show Details" button for the first event
         fireEvent.click(firstEventDetailsButton);

         // wait for any asynchronous updates that occur as a result of the event expansion
         await waitFor(() => {
            expect(screen.queryByText(/Hide Details/i)).toBeInTheDocument();
         });
      });

      then('the view of that event should change from a collapsed view to a detailed view', () => {
         const details = screen.queryAllByTestId('event-description');  // Get the details section of the event the user clicked on
         expect(details.length).toBeGreaterThan(0);  // Assuming details are only rendered when expanded, this should be greater than 0
      });
   });

   test('User can collapse an event to hide details.', ({ given, when, then }) => {
      let firstEventDetailsButton;

      given('an event view has been expanded', async () => {
         // the following is essentially the entire test for expanding an event and confirming the details are shown, to be done as a precondition for this test
         render(<App />);
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });
         const eventTitles = await screen.findAllByTestId('event-title');
         expect(eventTitles.length).toBeGreaterThan(0);
         firstEventDetailsButton = screen.getAllByText('Show Details')[0];
         fireEvent.click(firstEventDetailsButton);
         await waitFor(() => {
            expect(screen.queryByText(/Hide Details/i)).toBeInTheDocument();
         });
         then('the view of that event should change from a collapsed view to a detailed view', () => {
            const details = screen.queryAllByTestId('event-description');
            expect(details.length).toBeGreaterThan(0);
         });
      });

      when('the user clicks on "hide details" button', () => {
         firstEventDetailsButton = screen.getAllByText('Hide Details')[0];  // Get the "Hide Details" button for the first event
         fireEvent.click(firstEventDetailsButton);    // simulate user clicking on "Hide Details" button for the first event
      });

      then('the view of that event should change from an expanded view to a collapsed view', async () => {
         await waitFor(() => {
            expect(screen.getAllByText('Show Details')[0]).toBeInTheDocument();  // Check that the "Show Details" button is back on the first event
         });
      });
   });

});
