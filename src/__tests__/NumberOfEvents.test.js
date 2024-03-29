import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {

   beforeEach(() => {
      render(<NumberOfEvents />);
   });

   // test that the component renders an input element of a textbox
   test('component contains an element with the role of textbox', () => {
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeInTheDocument();
   });

   // test that the default value of the input field is 32
   test('default value of the input field is 32', () => {
      const inputElement = screen.getByRole('textbox');
      expect(inputElement.value).toBe('32');
   });
});

describe('<NumberOfEvents /> integration', () => {
   // test that the value of the textbox changes when a user types in it
   test('value of the textbox changes when a user types in it', async () => {
      // Create a mock function to pass as a prop to the NumberOfEvents component
      const setCurrentNOE = jest.fn();                             
      render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);

      const inputElements = screen.getAllByTestId('number-of-events-input');   // screen is a global object provided by the testing library
      const inputElement = inputElements[0]; // Target the first input element
      await userEvent.type(inputElement, '{backspace}{backspace}10');  // simulate clear the input field and type '10'
      expect(inputElement.value).toBe('10');
    });
});