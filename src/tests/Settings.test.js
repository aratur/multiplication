/* eslint-disable jest/no-conditional-expect */
/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactGA from 'react-ga';
import store from '../redux-store/store';
import Settings from '../components/Settings';

const renderSettings = (minimumNoOfSelectedValues = 3) => {
  ReactGA.initialize('foo', { testMode: true });
  return render(
    <Provider store={store}>
      <Settings minimumNoOfSelectedValues={minimumNoOfSelectedValues} />
    </Provider>
  );
};

const buttonNo = (number) =>
  screen.getByRole('checkbox', { name: String(number) });

describe('Settings', () => {
  it('should render all selected values', () => {
    const rangeLength = 10;
    const { getAllByRole } = renderSettings();
    expect(getAllByRole('checkbox', { checked: true })).toHaveLength(
      rangeLength
    );
  });

  it('should display warning after to few options are selected', async () => {
    const minimumNoOfSelectedValues = 9;
    renderSettings(minimumNoOfSelectedValues);
    userEvent.click(buttonNo(7));
    userEvent.click(buttonNo(3));
    expect(await screen.findByText('Not so fast')).toBeInTheDocument();
  });

  it('should have proper class if checked or not checked', () => {
    renderSettings();
    userEvent.click(buttonNo(10));
    userEvent.click(buttonNo(5));
    userEvent.click(buttonNo(1));
    screen.getAllByRole('checkbox').forEach((x) => {
      if (x.getAttribute('aria-checked') === 'true') {
        expect(x).toHaveClass('btn btn-success');
      } else {
        expect(x).toHaveClass('btn btn-info');
      }
    });
  });
});
