// checks whether the CitySearch component contains a textbox or not, and whether it contains a list of suggestions or not.

import { render } from '@testing-library/react';
import { extractLocations, getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
   let CitySearchComponent;
   beforeEach(() => {
      CitySearchComponent = render(<CitySearch />);
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
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

      const cityTextBox = CitySearchComponent.queryByRole('textbox');   // get the textbox element from the DOM
      await user.type(cityTextBox, "Berlin");                           // simulate user typing "Berlin" in the textbox
  
      // the suggestion's textContent look like this: "Berlin, Germany"
      const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];  // get the first suggestion from the list

      await user.click(BerlinGermanySuggestion);   // simulate user clicking on the suggestion
  
      expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});