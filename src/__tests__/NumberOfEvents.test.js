import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents />', () => {

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

   // test that the value of the textbox changes when a user types in it
   test('value of the textbox changes when a user types in it', async () => {
      const inputElement = screen.getByRole('textbox');   // screen is a global object provided by the testing library
      await userEvent.type(inputElement, '{backspace}{backspace}10');  // simulate clear the input field and type '10'
      expect(inputElement.value).toBe('10');
    });
});