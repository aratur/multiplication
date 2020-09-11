/* eslint "react/button-has-type": "off" */
import React from 'react';
import PropTypes from 'prop-types';
import multiply from './img/multiply.png';
import equals from './img/equals.png';

// without JSX
const Equation = (props) => {
  const numberProps = {
    style: {
      margin: '5px',
      width: '55px',
      height: '55px',
      padding: '0px',
    },
    type: 'button',
    tabIndex: '-1',
    role: 'contentinfo',
    className: 'btn btn-success btn-lg',
  };
  const signProps = {
    style: {
      margin: '5px',
      width: '55px',
      height: '55px',
      padding: '12px',
    },
  };

  const { xValue, yValue, correctAnswer } = props;

  return React.createElement(
    'div', { className: 'well', style: { padding: '10px' } },
    React.createElement(
      'label', { htmlFor: 'equation' }, 'Przeczytaj równanie',
      React.createElement(
        'div', { id: 'equation' },
        React.createElement('button',
          { name: `number ${xValue}`, ...numberProps }, xValue),
        React.createElement('img',
          { src: multiply, alt: 'multiply', ...signProps }),
        React.createElement('button',
          { name: `by ${yValue}`, ...numberProps }, yValue),
        React.createElement('img',
          { src: equals, alt: 'equals', ...signProps }),
        React.createElement('button',
          { name: `answer ${correctAnswer}`, ...numberProps }, correctAnswer),
      ),
    ),
  );
};

Equation.propTypes = {
  xValue: PropTypes.number.isRequired,
  yValue: PropTypes.number.isRequired,
  correctAnswer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Equation;
