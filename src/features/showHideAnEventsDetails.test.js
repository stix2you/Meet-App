import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { getEvents } from '../api';
import Event from '../components/Event';

// loadFeature is a Jest function that loads the feature file that we want to test
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

   test('An event element is collapsed by default.', ({ given, when, then }) => {
      let EventComponent;
      let firstEvent;

      given('any number of events have been displayed on the screen', async () => {
         const allEvents = await getEvents();
         firstEvent = allEvents[0]; // Save the first event for use in all tests
         EventComponent = render(<Event event={firstEvent} />); // Render the Event component with the first event
         render(<App />);
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });
      });

      when('they are displayed', async () => {
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });
      });

      then('they should be displayed in a collapsed format for readability', async () => {
         const details = EventComponent.container.querySelector('.event-description');
         expect(details).not.toBeInTheDocument();
      });
   });


   test('User can expand an event to see details.', ({ given, when, then }) => {
      let EventComponent;
      let firstEvent;

      given('there is any list of collapsed events', async () => {
         const allEvents = await getEvents();   // Fetch the list of events
         firstEvent = allEvents[0]; // Save the first event for use in all tests
         EventComponent = render(<Event event={firstEvent} />); // Render the Event component with the first event
         render(<App />);
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });
      });

      when('the user clicks on "show details" button', async () => {
         const user = userEvent.setup();
         const button = EventComponent.queryByText('Show Details');
         await user.click(button);   // Simulate a user click on the button
      });

      then('the view of that event should change from a collapsed view to a detailed view', () => {
         const details = EventComponent.container.querySelector('.event-description');   // Get the details section
         expect(details).toBeInTheDocument();
      });

   });

   test('User can collapse an event to hide details.', ({ given, when, then }) => {

      given('an event view has been expanded', () => {

      });

      when('the user clicks on "hide details" button', () => {

      });

      then('the view of that event should change from an expanded view to a collapsed view', () => {

      });
   });

});



// test('An event element is collapsed by default.', ({ given, when, then }) => {

//    given('any number of events have been displayed on the screen', async () => {
//       render(<App />);
//       await waitFor(() => {
//          expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
//       });
//    });

//    when('they are displayed', () => {
//       // same condition as "given" section
//    });

//    then('they should be displayed in a collapsed format for readability', async () => {
//       const eventDetailsButtons = await screen.findAllByRole('button', { name: 'Show Details' });
//       expect(eventDetailsButtons.length).toBeGreaterThan(0); // Ensure there's at least one event.
//       eventDetailsButtons.forEach(button => {
//          expect(button.textContent).toBe('Show Details');
//       });
//    });
// });

// test('User can expand an event to see details.', async ({ given, when, then }) => {

//    given('there is any list of collapsed events', async () => {
//       render(<App />);
//       await waitFor(() => {
//          expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
//       });
//    });

//    when('the user clicks on "show details" button', async () => {
//       const showDetailsButtons = await screen.findAllByRole('button', { name: 'Show Details' });
//       fireEvent.click(showDetailsButtons[0]);
//    });

//    then('the view of that event should change from a collapsed view to a detailed view', async () => {
//       const hideDetailsButton = await screen.findByText('Hide Details');
//       expect(hideDetailsButton).toBeInTheDocument();
//       const eventDescription = await screen.findByTestId('event-description'); // Ensure the Event component has data-testid="event-description" on the details div
//       expect(eventDescription).toBeInTheDocument();
//    });

// });

// test('User can collapse an event to hide details.', async ({ given, when, then }) => {
//    let firstShowDetailsButton;

//    given('an event view has been expanded', async () => {
//       render(<App />);
//       await waitFor(() => {
//          expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
//       });
//       const showDetailsButtons = await screen.findAllByRole('button', { name: 'Show Details' });
//       firstShowDetailsButton = showDetailsButtons[0];
//       fireEvent.click(firstShowDetailsButton); // Expand the first event
//       await waitFor(() => {
//          expect(screen.getByText('Hide Details')).toBeInTheDocument(); // Ensure the details have been shown
//       });
//    });

//    when('the user clicks on "hide details" button', () => {
//       const hideDetailsButton = screen.getByText('Hide Details'); // This assumes only one event has been expanded and thus only one Hide Details button exists
//       fireEvent.click(hideDetailsButton);
//    });

//    then('the view of that event should change from an expanded view to a collapsed view', async () => {
//       await waitFor(() => {
//          expect(firstShowDetailsButton.textContent).toBe('Show Details'); // Check if the text reverted back to "Show Details"
//       });

//       // Alternatively, if you want to ensure the details are now hidden, and assuming the details have a unique identifier or role
//       // expect(screen.queryByTestId('event-description')).not.toBeInTheDocument(); // This assumes the details have been hidden
//    });
// });