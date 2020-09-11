import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionForm from '../QuestionForm';

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
  const answerValues = [];
  for (let i = 0; i < answerButtons.length; i++) {
    answerValues.push(Number(answerButtons[i].textContent));
  }
  return { equationResult, answerValues };
};

describe('QuestionForm', () => {
  it('shows correct number of possible answers', () => {
    const numberOfAnswers = 2;
    renderQuestionForm(numberOfAnswers);
    expect(screen.getAllByRole('button')).toHaveLength(numberOfAnswers);
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
    const { equationResult, answerValues } = getCorrectAndPossibleAnswers();
    expect(answerValues.indexOf(equationResult)).toBeGreaterThan(-1);
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
  it('should disable/re-enable answer buttons after selecting one', () => {
    renderQuestionForm();
    const { equationResult } = getCorrectAndPossibleAnswers();
    const correctAnswerButton = screen
      .getByRole('button', { name: String(equationResult) });
    userEvent.click(correctAnswerButton);
    const buttonsVisible = screen.getAllByRole('button');
    // all disabled but last one with image
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
  it('displays success image after selecting correct answer and allow hiding it', () => {
    renderQuestionForm();
    const { equationResult, answerValues } = getCorrectAndPossibleAnswers();
    const wrongAnswer = answerValues.find((value) => value !== equationResult);
    const wrongAnswerButton = screen
      .getByRole('button', { name: String(wrongAnswer) });
    userEvent.click(wrongAnswerButton);
    const isSadImg = screen.getByRole('img', { name: 'Oh no!' });
    expect(isSadImg).toBeInTheDocument();
    userEvent.click(isSadImg);
    expect(screen.queryByRole('img', { name: 'Oh no!' })).not.toBeInTheDocument();
  });
});
