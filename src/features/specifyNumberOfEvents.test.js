import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

// loadFeature is a Jest function that loads the feature file that we want to test
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

// defineFeature is a Jest function that defines the feature, feature is the feature file that we loaded, 
// test is a Jest function that defines the test, and the test is the scenario that we loaded from the feature file
defineFeature(feature, test => {
   
   test('When user hasn\'t specified a number, 32 is the default number of events', ({ given, when, then, and }) => {
      
      given('the app is opened in its default state', async () => {
         render(<App />);
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });
      });

      when('the user hasn\'t specified a number of events', () => {
         // inherently true, as the user hasn't done anything yet
      });

      then('32 is displayed in the input field for number of events', () => {
         const numberOfEventsInput = screen.getByTestId('number-of-events-input');
         expect(numberOfEventsInput.value).toBe('32');
      });

      and('the number of events shown matches the number of events in the data, up to 32', () => {
         const eventListItems = screen.getAllByTestId('event');
         expect(eventListItems.length).toBeLessThanOrEqual(32);
      });

   });

   test('User can change the number of events displayed', ({ given, when, then }) => {
      let newNumberOfEvents = 10; // The new number of events to display, can be changed here to test different numbers simulated to be entered by user

      given('the app is rendered', async () => {
         render(<App />);
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });
      });

      when('the user enters a number in the number of events input field', async () => {
         const input = screen.getByTestId('number-of-events-input');
         await userEvent.clear(input);
         await userEvent.type(input, `${newNumberOfEvents}`);
         await waitFor(() => {
            // Wait for the event list to update according to the new number
            const eventListItems = screen.getAllByTestId('event');
            expect(eventListItems.length).toBe(newNumberOfEvents);
         });

      });

      then('the number of events shown matching the number of events in the data, up to the number entered', () => {
         const eventListItems = screen.getAllByTestId('event');
         expect(eventListItems.length).toBe(newNumberOfEvents);
      });

   });
});
