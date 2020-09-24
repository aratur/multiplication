import React from 'react';
import { render } from 'react-dom';
import pretty from 'pretty';
import Equation from '../components/Equation';

describe('Equation', () => {
  it('should render correctly', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <Equation
        xValue={2}
        yValue={2}
        correctAnswer={22}
      />, container,
    );
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
