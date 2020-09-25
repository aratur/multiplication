import React from 'react';
import { render } from 'react-dom';
import pretty from 'pretty';
import { Provider } from 'react-redux';
import Equation from '../components/Equation';
import store from '../redux-store/store';

describe('Equation', () => {
  it('should render correctly', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <Provider store={store}>
        <Equation
          xValue={2}
          yValue={2}
          correctAnswer={22}
        />
      </Provider>, container,
    );
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
