import { render, within, waitFor } from '@testing-library/react';
import { extractLocations, getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';

describe('<CitySearch /> component', () => {
   let CitySearchComponent;

   beforeEach(() => {
      CitySearchComponent = render(<CitySearch allLocations={[]}/>);  // dummy prop passed to the CitySearch component
   });

   test('renders text input', () => {
      const cityTextBox = CitySearchComponent.queryByRole('textbox');
      expect(cityTextBox).toBeInTheDocument();
      expect(cityTextBox).toHaveClass('city');
   });

   // ensures that no list (i.e., the suggestion list) is shown within the CitySearch component by default
   test('suggestions list is hidden by default', () => {
      const suggestionList = CitySearchComponent.queryByRole('list');
      expect(suggestionList).not.toBeInTheDocument();
   });

   // ensures that the suggestion list is shown when the textbox gains focus
   test('renders a list of suggestions when city textbox gains focus', async () => {
      const user = userEvent.setup();
      const cityTextBox = CitySearchComponent.queryByRole('textbox');
      await user.click(cityTextBox);    // this is where the user interaction is simulated, asynch function needs await to work properly
      const suggestionList = CitySearchComponent.queryByRole('list');   // initialized after the click as this is when the list is rendered
      expect(suggestionList).toBeInTheDocument();
      expect(suggestionList).toHaveClass('suggestions');
   });

   // ensure that the suggestion list updates correctly when the user types in the city textbox
   test('updates list of suggestions correctly when user types in city textbox', async () => {
      const user = userEvent.setup();
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

      // user types "Berlin" in city textbox
      const cityTextBox = CitySearchComponent.queryByRole('textbox');
      await user.type(cityTextBox, "Berlin");

      // filter allLocations to locations matching "Berlin"
      const suggestions = allLocations ? allLocations.filter((location) => {
         return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
      }) : [];

      // get all <li> elements inside the suggestion list
      const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      for (let i = 0; i < suggestions.length; i += 1) {
         expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
      }
   });

   test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
      const user = userEvent.setup();
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      CitySearchComponent.rerender(<CitySearch 
         allLocations={allLocations}
         setCurrentCity={() => { }} />);

      const cityTextBox = CitySearchComponent.queryByRole('textbox');   // get the textbox element from the DOM
      await user.type(cityTextBox, "Berlin");                           // simulate user typing "Berlin" in the textbox

      // the suggestion's textContent look like this: "Berlin, Germany"
      const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];  // get the first suggestion from the list

      await user.click(BerlinGermanySuggestion);   // simulate user clicking on the suggestion

      expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
   });

   test('suggestion list should have only one item ("See all cities") when user types a city that does not exist', async () => {
      const user = userEvent.setup();
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
    
      // Simulate user typing "Paris, France" in the city textbox
      const cityTextBox = CitySearchComponent.queryByRole('textbox');
      await user.type(cityTextBox, "XXX, XXX");
    
      // Get all <li> elements inside the suggestion list
      const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
      
      // Expect the suggestion list to have only one item ("See all cities")
      expect(suggestionListItems).toHaveLength(1);
      expect(suggestionListItems[0]).toHaveTextContent('See all cities');
    });
});

describe('<CitySearch /> integration', () => {
   test('renders suggestions list when the app is rendered.', async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      const CitySearchDOM = AppDOM.querySelector('#city-search');
      const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
      await user.click(cityTextBox);

      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);

      await waitFor(() => {      
         const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
         expect(suggestionListItems.length).toBe(allLocations.length + 1);
      });
   });
});
