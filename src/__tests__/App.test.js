import { render } from '@testing-library/react';
import App from '../App';

// Test that the App component renders a list of events
describe('<App /> component', () => {  // Describe the component we are testing
   let AppDOM;    // Declare a variable to store the DOM element
   beforeEach(() => {    // Before each test, render the component and store the DOM element
      AppDOM = render(<App />).container.firstChild;
   })

   test('renders list of events', () => {    // Test that the component renders a list of events
      expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();    // Check that the DOM element contains an element with the ID 'event-list'
   });

   test('render CitySearch', () => {
      expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
   });

   test('render NumberOfEvents', () => {
      expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
   });   
});