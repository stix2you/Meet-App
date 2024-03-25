import { render } from '@testing-library/react';
import App from '../App';

// Test that the App component renders a list of events
describe('<App /> component', () => {  // Describe the component we are testing
   
   test('renders list of events', () => {    // Test that the component renders a list of events
      const AppDOM = render(<App />).container.firstChild;    // Render the component and get the DOM element
      expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();    // Check that the DOM element contains an element with the ID 'event-list'
   });
   test('render CitySearch', () => {
      const AppDOM = render(<App />).container.firstChild;
      expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
   });
});