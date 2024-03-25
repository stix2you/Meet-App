// checks whether the CitySearch component contains a textbox or not, and whether it contains a list of suggestions or not.

import { render } from '@testing-library/react';
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
});