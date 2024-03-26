// src/__tests__/NumberOfEvents.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberOfEvents from '../components/NumberOfEvents';

test('component contains an element with the role of textbox', () => {
  render(<NumberOfEvents />);
  const textboxElement = screen.getByRole('textbox');
  expect(textboxElement).toBeInTheDocument();
});

test('default value of the input field is 32', () => {
  render(<NumberOfEvents />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement.value).toBe('32');
});

test('value of the textbox changes when a user types in it', async () => {
  render(<NumberOfEvents />);
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: '10' } });
  expect(inputElement.value).toBe('10');
});