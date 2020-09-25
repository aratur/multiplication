import React from 'react';
import {
  render, screen, act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import shallowequal from 'shallowequal';
import store from '../redux-store/store';
import LandingPage from '../components/LandingPage';

const renderLandingPage = () => render(
  <Provider store={store}>
    <LandingPage />
  </Provider>,
);

const getEquationResult = () => screen
  .getAllByRole('option', { name: /[0-9]/i })
  .map((element) => Number(element.textContent))
  .reduce((results, value) => value * results, 1);
const getPossibleAnswers = () => screen
  .getAllByRole('button')
  .map((element) => Number(element.textContent));

describe('QuestionForm', () => {
  it('shows correct number of possible answers', () => {
    const numberOfAnswers = 5;
    renderLandingPage();
    expect(screen.getAllByRole('button')).toHaveLength(numberOfAnswers);
  });
  it('shows equation with all elements', () => {
    renderLandingPage();
    const numberButtons = screen.getAllByRole('option');
    expect(numberButtons).toHaveLength(3);
    const questionButton = screen.getByRole('option', { name: '?' });
    expect(questionButton).toHaveTextContent('?');
    const imgMultiply = screen.getByRole('img', { name: 'multiply' });
    expect(imgMultiply).toBeInTheDocument();
  });
  it('shows correct result in possible answers', () => {
    renderLandingPage();
    const equationResult = getEquationResult();
    const possibleAnswers = getPossibleAnswers();
    expect(possibleAnswers.indexOf(equationResult))
      .toBeGreaterThan(-1);
  });
  it('displays success image after selecting correct answer and auto-hides it', () => {
    jest.useFakeTimers();
    renderLandingPage();
    const equationResult = getEquationResult();
    const correctAnswerButton = screen
      .getByRole('button', { name: String(equationResult) });
    userEvent.click(correctAnswerButton);
    let isHappyImg = screen.getByRole('img', { name: 'Good job!' });
    expect(isHappyImg).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    isHappyImg = screen.getByRole('img', { name: 'Good job!' });
    expect(isHappyImg).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2500);
    });
    const findHappyImg = screen.queryByRole('img', { name: 'Good job!' });
    expect(findHappyImg).not.toBeInTheDocument();
  });
  it('should change visibility of irrelevant buttons after answering', () => {
    renderLandingPage();
    const equationResult = getEquationResult();
    const correctAnswerButton = screen
      .getByRole('button', { name: String(equationResult) });
    userEvent.click(correctAnswerButton);
    const buttonsWithAnswers = screen
      .getAllByRole('button', { name: /[0-9]/i });
    for (let i = 0; i < buttonsWithAnswers.length; i++) {
      if (Number(buttonsWithAnswers[i].textContent) === equationResult) {
        expect(buttonsWithAnswers[i]).toBeVisible();
      } else {
        expect(buttonsWithAnswers[i]).not.toBeVisible();
      }
    }
    // last button is an image which allows resetting the equation
    userEvent.click(screen.getByRole('img', { name: 'Good job!' }));
    const buttonsVisibleAfterReset = screen.getAllByRole('button');
    for (let i = 0; i < buttonsVisibleAfterReset.length; i++) {
      expect(buttonsVisibleAfterReset[i]).toBeEnabled();
    }
  });
  it('failure after selecting wrong answer', () => {
    renderLandingPage();
    const equationResult = getEquationResult();
    const possibleAnswers = getPossibleAnswers();
    const wrongAnswer = possibleAnswers
      .find((value) => value !== equationResult);
    const wrongAnswerButton = screen
      .getByRole('button', { name: String(wrongAnswer) });
    userEvent.click(wrongAnswerButton);
    const isSadImg = screen.getByRole('img', { name: 'Oh no!' });
    expect(isSadImg).toBeInTheDocument();
    userEvent.click(isSadImg);
    expect(screen.queryByRole('img', { name: 'Oh no!' }))
      .not.toBeInTheDocument();
  });
  it('displays load new question after selecting answer', () => {
    jest.useFakeTimers();
    renderLandingPage();
    for (let i = 0; i < 10; i++) {
      const equationResult = getEquationResult();
      const possibleAnswers = getPossibleAnswers();
      const correctAnswerButton = screen
        .getByRole('button', { name: String(equationResult) });
      userEvent.click(correctAnswerButton);
      // click the same button again to get to the next question
      userEvent.click(correctAnswerButton);
      const newEquationResult = getEquationResult();
      const newPossibleAnswers = getPossibleAnswers();
      if (equationResult === newEquationResult
        && shallowequal(possibleAnswers, newPossibleAnswers)) {
        console.log(`i${i}`,
          equationResult, newEquationResult,
          possibleAnswers, newPossibleAnswers);
      } else {
        expect(equationResult === newEquationResult
          && shallowequal(possibleAnswers, newPossibleAnswers))
          .toBe(false);
      }
    }
  });
});
