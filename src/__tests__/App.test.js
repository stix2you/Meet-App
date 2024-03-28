import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {  // Describe the component we are testing
   let AppDOM;    // Declare a variable to store the DOM element
   beforeEach(() => {    // Before each test, render the component and store the DOM element
      AppDOM = render(<App />).container.firstChild;
   })

   // Test that the component renders a list of events
   test('renders list of events', () => {    // Test that the component renders a list of events
      expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();    // Check that the DOM element contains an element with the ID 'event-list'
   });

   // Test that the component renders a CitySearch component
   test('render CitySearch', () => {
      expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
   });

   // Test that the component renders a NumberOfEvents component
   test('render NumberOfEvents', () => {
      expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
   });
});

describe('<App /> integration', () => {
   // Test that the component renders a list of events matching the city selected by the user
   test('renders a list of events matching the city selected by the user', async () => {
      const user = userEvent.setup();     // Set up the userEvent library
      const AppComponent = render(<App />);  // Render the App component
      const AppDOM = AppComponent.container.firstChild;  // Get the DOM element of the App component

      const CitySearchDOM = AppDOM.querySelector('#city-search');   // Get the CitySearch component from the DOM
      const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');  // Get the input element from the CitySearch component

      await user.type(CitySearchInput, "Berlin");   // Type "Berlin" in the input element to search for events in Berlin
      const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');  // Get the suggestion item for Berlin
      await user.click(berlinSuggestionItem);      // Click on the suggestion item for Berlin

      const EventListDOM = AppDOM.querySelector('#event-list');   // Get the EventList component from the DOM
      const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   // Get all the event items from the EventList component

      // Get all events and filter the events that are in Berlin
      const allEvents = await getEvents();
      const berlinEvents = allEvents.filter(
         event => event.location === 'Berlin, Germany'
      );

      // Check that the number of rendered events matches the number of events in Berlin
      expect(allRenderedEventItems.length).toBe(berlinEvents.length);

      // Check that each rendered event contain the text "Berlin, Germany"
      allRenderedEventItems.forEach(event => {
         expect(event.textContent).toContain("Berlin, Germany");
       });
   });
});