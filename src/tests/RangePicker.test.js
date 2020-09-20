/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../redux-store/store';
import RangePicker from '../RangePicker';

const renderRangePicker = (minimumNoOfSelectedValues = 3) => render(
  <Provider store={store}>
    <RangePicker minimumNoOfSelectedValues={minimumNoOfSelectedValues} />
  </Provider>,
);

const buttonNo = (number) => screen.getByRole('checkbox', { name: String(number) });

describe('RangePicker', () => {
  it('should render all selected values', () => {
    const rangeLength = 10;
    const { getAllByRole } = renderRangePicker();
    expect(getAllByRole('checkbox', { checked: true })).toHaveLength(rangeLength);
  });

  it('should change selected range after clicking on a button', () => {
    renderRangePicker();
    userEvent.click(buttonNo(1));
    expect(buttonNo(1)).toHaveClass('btn btn-info');
    expect(buttonNo(1)).not.toBeChecked();
  });

  it('should display warning after to few options are selected', async () => {
    const minimumNoOfSelectedValues = 9;
    renderRangePicker(minimumNoOfSelectedValues);
    userEvent.click(buttonNo(7));
    userEvent.click(buttonNo(3));
    expect(await screen.findByText('Nie tak szybko')).toBeInTheDocument();
  });

  it('should hide warning after clicking X', async () => {
    const minimumNoOfSelectedValues = 9;
    renderRangePicker(minimumNoOfSelectedValues);
    userEvent.click(buttonNo(7));
    userEvent.click(buttonNo(3));
    expect(await screen.findByText('Nie tak szybko')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'close alert' }));
    expect(screen.queryByText('Nie tak szybko')).not.toBeInTheDocument();
  });

  it('should have proper class if checked or not checked', () => {
    const { getAllByRole } = renderRangePicker();
    userEvent.click(buttonNo(10));
    userEvent.click(buttonNo(5));
    userEvent.click(buttonNo(1));
    getAllByRole('checkbox').forEach((x) => {
      if (x.getAttribute('aria-checked') === 'true') {
        expect(x).toHaveClass('btn btn-success');
      } else {
        expect(x).toHaveClass('btn btn-info');
      }
    });
  });
});
