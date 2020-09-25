import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

jest.mock('../components/LandingPage', () => () => <div>LandingPage</div>);
jest.mock('../components/ResultsTable', () => () => <div>ResultsTable</div>);
jest.mock('../components/Settings', () => () => <div>Settings</div>);

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const header = getByText(/start/i);
  expect(header).toBeInTheDocument();
});
