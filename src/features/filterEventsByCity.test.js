import { render, within, waitFor, screen } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { getEvents } from '../api';

// loadFeature is a Jest function that loads the feature file that we want to test
const feature = loadFeature('./src/features/filterEventsByCity.feature');

// defineFeature is a Jest function that defines the feature, feature is the feature file that we loaded, 
// test is a Jest function that defines the test, and the test is the scenario that we loaded from the feature file
defineFeature(feature, test => {

   test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
      let AppComponent;   // defined OUTSIDE of the given, when, then functions so that it can be accessed by all of them

      given('user hasn’t searched for any city', () => {
      });
      when('the user opens the app', () => {
         AppComponent = render(<App />);    // render the App component, this is the equivalent fo the app "opening" as it's the code that runs when the app is opened
      });
      then('the user should see the list of all upcoming events.', async () => {
         // Wait for the loading indicator to be removed from the DOM, to insure the events have been rendered in the DOM
         await waitFor(() => {
            expect(screen.queryByText(/loading events/i)).not.toBeInTheDocument();
         });

         // Now that the loading has presumably finished, you can assert the presence of the event list
         const AppDOM = AppComponent.container.firstChild;
         const EventListDOM = AppDOM.querySelector('#event-list');
         const EventListItems = within(EventListDOM).queryAllByRole('listitem');
         expect(EventListItems.length).toBe(32);
      });
   });


   test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
      given('the main page is open', () => {
      });
      when('user starts typing in the city textbox', () => {
      });
      then('the user should recieve a list of cities (suggestions) that match what they’ve typed', () => {
      });
   });


   test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
      given('user was typing “Berlin” in the city textbox', () => {
      });
      and('the list of suggested cities is showing', () => {
      });
      when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      });
      then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      });
      and('the user should receive a list of upcoming events in that city', () => {
      });
   });

});
