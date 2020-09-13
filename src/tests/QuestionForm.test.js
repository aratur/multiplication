import React from 'react';
import {
  render, screen, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import shallowequal from 'shallowequal';
import QuestionForm from '../QuestionForm';
import { resultStatus } from '../model/results';

// range of [true, true, true, true] translates to [1, 2, 3, 4]
// range of [true, true, false, true] translates to [1, 2, 4]
const renderQuestionForm = (noOfAnswers = 5,
  range = [true, true, true, true], setResultValueAt = () => {}) => render(
    <QuestionForm
      noOfAnswers={noOfAnswers}
      range={range}
      setResultValueAt={setResultValueAt}
    />,
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
    const numberOfAnswers = 2;
    renderQuestionForm(numberOfAnswers);
    expect(screen.getAllByRole('button')).toHaveLength(numberOfAnswers);
  });
  it('use callback function with correct answer', () => {
    const numberOfAnswers = 2;
    const callback = jest.fn();
    renderQuestionForm(numberOfAnswers, [true, true, true], callback);
    const [firstNumber, secondNumber] = screen
      .getAllByRole('option', { name: /[0-9]/i })
      .map((element) => Number(element.textContent));
    const equationResult = firstNumber * secondNumber;
    const correctAnswerButton = screen
      .getByRole('button', { name: String(equationResult) });
    userEvent.click(correctAnswerButton);
    expect(callback).toHaveBeenCalledTimes(1);
    const calledWith = callback.mock.calls[0];
    expect(calledWith[0].status).toBe(resultStatus.success);
    expect(calledWith[0].duration).toBeGreaterThan(0);
    expect(calledWith[1]).toBe(firstNumber);
    expect(calledWith[2]).toBe(secondNumber);
  });
  it('use callback function with wrong answer', () => {
    const numberOfAnswers = 2;
    const callback = jest.fn();
    renderQuestionForm(numberOfAnswers, [true, true, true], callback);
    const [firstNumber, secondNumber] = screen
      .getAllByRole('option', { name: /[0-9]/i })
      .map((element) => Number(element.textContent));
    const equationResult = firstNumber * secondNumber;
    const possibleAnswers = getPossibleAnswers();
    const wrongAnswer = possibleAnswers
      .find((value) => value !== equationResult);
    const wrongAnswerButton = screen
      .getByRole('button', { name: String(wrongAnswer) });
    userEvent.click(wrongAnswerButton);
    expect(callback).toHaveBeenCalledTimes(1);
    const calledWith = callback.mock.calls[0];
    expect(calledWith[0].status).toBe(resultStatus.failure);
    expect(calledWith[0].duration).toBeGreaterThan(0);
    expect(calledWith[1]).toBe(firstNumber);
    expect(calledWith[2]).toBe(secondNumber);
  });
  it('shows equation with all elements', () => {
    renderQuestionForm();
    const numberButtons = screen.getAllByRole('option');
    expect(numberButtons).toHaveLength(3);
    const questionButton = screen.getByRole('option', { name: '?' });
    expect(questionButton).toHaveTextContent('?');
    const imgMultiply = screen.getByRole('img', { name: 'multiply' });
    expect(imgMultiply).toBeInTheDocument();
  });
  it('shows equation result in possible answers', () => {
    renderQuestionForm();
    const equationResult = getEquationResult();
    const possibleAnswers = getPossibleAnswers();
    expect(possibleAnswers.indexOf(equationResult))
      .toBeGreaterThan(-1);
  });
  it('displays success image after selecting correct answer and auto-hides it', () => {
    jest.useFakeTimers();
    renderQuestionForm();
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
  it('should disable/re-enable answer buttons after answering', () => {
    renderQuestionForm();
    const equationResult = getEquationResult();
    const correctAnswerButton = screen
      .getByRole('button', { name: String(equationResult) });
    userEvent.click(correctAnswerButton);
    const buttonsVisible = screen
      .getAllByRole('button', { name: /[0-9]/i });
    for (let i = 0; i < buttonsVisible.length; i++) {
      expect(buttonsVisible[i]).toBeDisabled();
    }
    // last button is an image which allows resetting the equation
    userEvent.click(screen.getByRole('img', { name: 'Good job!' }));
    const buttonsVisibleAfterReset = screen.getAllByRole('button');
    for (let i = 0; i < buttonsVisibleAfterReset.length; i++) {
      expect(buttonsVisibleAfterReset[i]).toBeEnabled();
    }
  });
  it('failure after selecting wrong answer, hiding is possible', () => {
    renderQuestionForm();
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
    renderQuestionForm();
    for (let i = 0; i < 10; i++) {
      const equationResult = getEquationResult();
      const possibleAnswers = getPossibleAnswers();
      const correctAnswerButton = screen
        .getByRole('button', { name: String(equationResult) });
      userEvent.click(correctAnswerButton);
      act(() => {
        jest.advanceTimersByTime(2500);
      });
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
  it('change equation after modifying range', () => {
    const noOfAnswers = 5;
    const { rerender } = render(
      <QuestionForm
        noOfAnswers={noOfAnswers}
        range={[true, true, true, true]}
        setResultValueAt={() => {}}
      />,
    );
    const equationResult = getEquationResult();
    const possibleAnswers = getPossibleAnswers();
    rerender(<QuestionForm
      noOfAnswers={noOfAnswers}
      range={[false, false, false, false, true, true, true, true]}
      setResultValueAt={() => {}}
    />);
    const newEquationResult = getEquationResult();
    const newPossibleAnswers = getPossibleAnswers();
    expect(equationResult === newEquationResult
        && shallowequal(possibleAnswers, newPossibleAnswers)).toBe(false);
  });
});
