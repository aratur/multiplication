import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import store from '../../redux-store/store';

import Questions from './Questions';

// test utils file
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

jest.mock('react-ga', () => ({
  ga: jest.fn(),
}));

describe('Questions', () => {
  it('it is possible to answers all questions correctly', async () => {
    // TODO: Write your test code here
    renderWithRouter(
      <Provider store={store}>
        <Questions />
      </Provider>,
      { route: '/' }
    );

    const answerOneQuestion = async () => {
      const questionLeft = parseInt(
        screen.getByTestId('question-left').textContent,
        10
      );
      const questionRight = parseInt(
        screen.getByTestId('question-right').textContent,
        10
      );
      const result = questionLeft * questionRight;
      const answers = screen.getAllByTestId('answer-button');
      const correctAnswer = answers.find(
        (button) => parseInt(button.textContent, 10) === result
      );
      const answersValues = answers.map((button) =>
        parseInt(button.textContent, 10)
      );

      userEvent.click(correctAnswer);
      const successButton = await screen.findByTestId('happy-sad');
      userEvent.click(successButton);
      await waitFor(() =>
        expect(screen.queryByTestId('happy-sad')).not.toBeInTheDocument()
      );
      return [
        questionLeft,
        questionRight,
        answersValues,
        correctAnswer.textContent,
      ];
    };
    const answerAllQuestions = async (count = 0) => {
      if (count < 100) {
        await answerOneQuestion();
        await answerAllQuestions(count + 1);
      }
    };

    await answerAllQuestions();
    // screen.logTestingPlaygroundURL();
  });
});
