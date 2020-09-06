import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const header = getByText(/10 x 10/i);
  expect(header).toBeInTheDocument();
});
