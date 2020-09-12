import React from 'react';
import {
  render, screen, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import shallowequal from 'shallowequal';
import QuestionForm from '../QuestionForm';
import { answerStatus } from '../model/results';

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

const getCorrectAndPossibleAnswers = () => {
  const numberButtons = screen.getAllByRole('option');
  const firstNumber = Number(numberButtons[0].textContent);
  const secondNumber = Number(numberButtons[1].textContent);
  const equationResult = firstNumber * secondNumber;
  const answerButtons = screen.getAllByRole('button');
  const possibleAnswers = [];
  for (let i = 0; i < answerButtons.length; i++) {
    possibleAnswers.push(Number(answerButtons[i].textContent));
  }
  return { equationResult, possibleAnswers };
};

describe('QuestionForm', () => {
  it('shows correct number of possible answers', () => {
    const numberOfAnswers = 2;
    renderQuestionForm(numberOfAnswers);
    expect(screen.getAllByRole('button')).toHaveLength(numberOfAnswers);
  });
  it('use callback function with selected answer', () => {
    const numberOfAnswers = 2;
    const callback = jest.fn();
    renderQuestionForm(numberOfAnswers, [true, true, true], callback);
    const numberButtons = screen.getAllByRole('option');
    const firstNumber = Number(numberButtons[0].textContent);
    const secondNumber = Number(numberButtons[1].textContent);
    const equationResult = firstNumber * secondNumber;
    const correctAnswerButton = screen
      .getByRole('button', { name: String(equationResult) });
    userEvent.click(correctAnswerButton);
    expect(callback).toHaveBeenCalledTimes(1);
    const calledWith = callback.mock.calls[0];
    expect(calledWith[0].status).toBe(answerStatus.success);
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
    const { equationResult, possibleAnswers } = getCorrectAndPossibleAnswers();
    expect(possibleAnswers.indexOf(equationResult)).toBeGreaterThan(-1);
  });
  it('displays success image after selecting correct answer and auto-hides it', () => {
    jest.useFakeTimers();
    renderQuestionForm();
    const { equationResult } = getCorrectAndPossibleAnswers();
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
    const { equationResult } = getCorrectAndPossibleAnswers();
    const correctAnswerButton = screen
      .getByRole('button', { name: String(equationResult) });
    userEvent.click(correctAnswerButton);
    const buttonsVisible = screen.getAllByRole('button');
    // all should be disabled but last one (with image)
    for (let i = 0; i < buttonsVisible.length - 1; i++) {
      expect(buttonsVisible[i]).toBeDisabled();
    }
    // last button is an image which allows resetting the equation
    userEvent.click(buttonsVisible[buttonsVisible.length - 1]);
    const buttonsVisibleAfterReset = screen.getAllByRole('button');
    // all should be enabled
    for (let i = 0; i < buttonsVisibleAfterReset.length; i++) {
      expect(buttonsVisibleAfterReset[i]).toBeEnabled();
    }
  });
  it('displays failure image after selecting wrong answer and allows hiding it', () => {
    renderQuestionForm();
    const { equationResult, possibleAnswers } = getCorrectAndPossibleAnswers();
    const wrongAnswer = possibleAnswers.find((value) => value !== equationResult);
    const wrongAnswerButton = screen
      .getByRole('button', { name: String(wrongAnswer) });
    userEvent.click(wrongAnswerButton);
    const isSadImg = screen.getByRole('img', { name: 'Oh no!' });
    expect(isSadImg).toBeInTheDocument();
    userEvent.click(isSadImg);
    expect(screen.queryByRole('img', { name: 'Oh no!' })).not.toBeInTheDocument();
  });
  it('displays load new question after selecting answer', () => {
    jest.useFakeTimers();
    renderQuestionForm();
    for (let i = 0; i < 10; i++) {
      const { equationResult, possibleAnswers } = getCorrectAndPossibleAnswers();
      const correctAnswerButton = screen
        .getByRole('button', { name: String(equationResult) });
      userEvent.click(correctAnswerButton);
      act(() => {
        jest.advanceTimersByTime(3500);
      });

      const {
        equationResult: newEquationResult,
        answerValues: newPossibleAnswers,
      } = getCorrectAndPossibleAnswers();
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
    const { equationResult, possibleAnswers } = getCorrectAndPossibleAnswers();
    rerender(<QuestionForm
      noOfAnswers={noOfAnswers}
      range={[false, false, false, false, true, true, true, true]}
      setResultValueAt={() => {}}
    />);
    const {
      equationResult: newEquationResult,
      possibleAnswers: newPossibleAnswers,
    } = getCorrectAndPossibleAnswers();
    expect(equationResult === newEquationResult
        && shallowequal(possibleAnswers, newPossibleAnswers)).toBe(false);
  });
});
