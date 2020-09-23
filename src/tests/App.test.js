import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

jest.mock('../QuestionForm', () => () => <div>QuestionForm</div>);
jest.mock('../ResultsTable', () => () => <div>ResultsTable</div>);
jest.mock('../Settings', () => () => <div>Settings</div>);

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const header = getByText(/start/i);
  expect(header).toBeInTheDocument();
});
