import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import shallowequal from 'shallowequal';
import { Provider } from 'react-redux';
import store from '../redux-store/store';
import MultiplicationTable from '../MultiplicationTable';

jest.mock('../ResultsTable', () => () => <div>ResultsTable</div>);

const renderMultiplicationTable = () => render(
  <Provider store={store}>
    <MultiplicationTable />
  </Provider>,
);

describe('MultiplicationTable', () => {
  it('should render all children', () => {
    renderMultiplicationTable();
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getAllByRole('checkbox')).toHaveLength(10);
    expect(screen.getByText('ResultsTable')).toBeInTheDocument();
  });
  it('should update in case of range change', () => {
    jest.mock('../QuestionForm', () => () => <div />);
    renderMultiplicationTable();
    screen.getAllByRole('checkbox')
      .forEach((element) => expect(element).toBeChecked());
    userEvent.click(screen.getByRole('checkbox', { name: '1' }));
    screen.getAllByRole('checkbox')
      .forEach((element) => {
        if (element.textContent !== '1') {
          expect(element).toBeChecked();
        } else { expect(element).not.toBeChecked(); }
      });
  });
  it('should update after answer is provided', () => {
    jest.mock('../RangePicker', () => () => <div />);
    renderMultiplicationTable();
    const getEquationResult = () => screen
      .getAllByRole('option', { name: /[0-9]/i })
      .map((element) => Number(element.textContent))
      .reduce((results, value) => value * results, 1);
    const equationResult = getEquationResult();
    const possibleAnswers = screen
      .getAllByRole('button').map((element) => element.textContent);
    userEvent.click(screen
      .getByRole('button', { name: String(equationResult) }));
    const newPossibleAnswers = screen
      .getAllByRole('button').map((element) => element.textContent);
    const newEquationResult = getEquationResult();
    expect(equationResult === newEquationResult
      && shallowequal(possibleAnswers, newPossibleAnswers))
      .not.toBe(true);
  });
});
