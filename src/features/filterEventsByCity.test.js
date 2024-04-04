import { render, within, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

      then('the user should see the list of all upcoming events', async () => {
         // There is a loading indicator rendered while the API loads... so need to WAIT for the loading indicator to be removed from the DOM first 
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
      let AppComponent;
      let CitySearchDOM;

      given('the main page is open', () => {
         AppComponent = render(<App />);
      });

      when('user starts typing in the city textbox', async () => {
         const user = userEvent.setup();   // Set up the userEvent library to simulate user typing in the textbox 
         const AppDOM = AppComponent.container.firstChild;   // Get the DOM element of the App component
         CitySearchDOM = AppDOM.querySelector('#city-search');    // Get the CitySearch component from the DOM
         const citySearchInput = within(CitySearchDOM).queryByRole('textbox');   // Get the input element from the CitySearch component
         await user.type(citySearchInput, "Berlin");     // Simulate user typing "Berlin" in the input element to search for events in Berlin
      });

      then('the user should recieve a list of cities (suggestions) that match what they’ve typed', async () => {
         const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
         expect(suggestionListItems).toHaveLength(2);
      });

   });


   test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
      let AppComponent;
      let AppDOM;
      let CitySearchDOM;
      let citySearchInput;
      let suggestionListItems;

      given('user was typing “Berlin” in the city textbox', async () => {
         AppComponent = render(<App />);     // Render the App component
         const user = userEvent.setup();     // Set up the userEvent library to simulate user typing in the textbox
         AppDOM = AppComponent.container.firstChild;   // Get the DOM element of the App component
         CitySearchDOM = AppDOM.querySelector('#city-search');   // Get the CitySearch component from the DOM
         citySearchInput = within(CitySearchDOM).queryByRole('textbox');   // Get the input element from the CitySearch component
         await user.type(citySearchInput, "Berlin");                       // Simulate user typing "Berlin" in the input element to search for events in Berlin
      });
      and('the list of suggested cities is showing', () => {
         suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');   // Get the list of suggested cities from the CitySearch component
         expect(suggestionListItems).toHaveLength(2);                              // Expect the list to have 2 items
      });

      when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
         const user = userEvent.setup();
         await user.click(suggestionListItems[0]);
      });
      then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
         expect(citySearchInput.value).toBe('Berlin, Germany');
      });
      and('the user should receive a list of upcoming events in that city', async () => {
         const EventListDOM = AppDOM.querySelector('#event-list');
         const EventListItems = within(EventListDOM).queryAllByRole('listitem');
         const allEvents = await getEvents();

         // filtering the list of all events down to events located in Germany
         // citySearchInput.value should have the value "Berlin, Germany" at this point
         const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
         expect(EventListItems).toHaveLength(berlinEvents.length);
      });
   });

});
