import React from 'react';
import { render } from '@testing-library/react';
import ReactGA from 'react-ga';
import App from '../components/App';

jest.mock('../components/LandingPage', () => () => <div>LandingPage</div>);
jest.mock('../components/ResultsTable', () => () => <div>ResultsTable</div>);
jest.mock('../components/Settings', () => () => <div>Settings</div>);
ReactGA.initialize('foo', { testMode: true });

describe('App', () => {
  it('should initialize Google Analytics', () => {
    expect(ReactGA.testModeAPI.calls).toEqual([
      ['create', 'foo', 'auto']]);
  });

  it('renders learn react link', () => {
    const { getByText } = render(<App />);
    const header = getByText(/start/i);
    expect(header).toBeInTheDocument();
  });
});
