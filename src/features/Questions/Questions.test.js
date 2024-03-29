import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import userEvent from '@testing-library/user-event';
import ReactGA from 'react-ga';
import store, { persistor } from '../../redux-store/store';
import LandingPage from './Questions';

const renderLandingPage = () => {
  ReactGA.initialize('foo', { testMode: true });
  return render(
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <LandingPage />
      </PersistGate>
    </Provider>
  );
};

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  renderLandingPage();
});

const findEquationResult = async () => {
  const options = await screen.findAllByRole('option', { name: /[0-9]/i });
  return options
    .map((element) => Number(element.textContent))
    .reduce((results, value) => value * results, 1);
};
const findPossibleAnswers = async () => {
  const buttons = await screen.findAllByRole('button');
  return buttons.map((element) => Number(element.textContent));
};

describe('QuestionForm', () => {
  it('shows correct number of possible answers', () => {
    const numberOfAnswers = 4;
    expect(screen.getAllByRole('button')).toHaveLength(numberOfAnswers);
  });
  it('shows equation with all elements', () => {
    const numberButtons = screen.getAllByRole('option');
    expect(numberButtons).toHaveLength(3);
    const questionButton = screen.getByRole('option', { name: '?' });
    expect(questionButton).toHaveTextContent('?');
    const imgMultiply = screen.getByRole('img', { name: 'multiply' });
    expect(imgMultiply).toBeInTheDocument();
  });
  it('shows correct result in possible answers', async () => {
    const equationResult = await findEquationResult();
    const possibleAnswers = await findPossibleAnswers();
    expect(possibleAnswers.indexOf(equationResult)).toBeGreaterThan(-1);
  });

  it('failure after selecting wrong answer', async () => {
    const equationResult = await findEquationResult();
    const possibleAnswers = await findPossibleAnswers();
    const wrongAnswer = possibleAnswers.find(
      (value) => value !== equationResult
    );
    const wrongAnswerButton = screen.getByRole('button', {
      name: String(wrongAnswer),
    });
    userEvent.click(wrongAnswerButton);
    const isSadImg = await screen.findByRole('img', { name: 'Oh no!' });
    expect(isSadImg).toBeInTheDocument();
  });
});
