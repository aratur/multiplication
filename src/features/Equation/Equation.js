import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import multiply from '../../assets/multiply.png';
import equals from '../../assets/equals.png';
import { i18n, getTranslations } from '../../redux-store/i18nSlice';

// without JSX
const Equation = (props) => {
  const numberProps = {
    style: {
      marginTop: '5px',
      width: '50px',
      height: '50px',
    },
    type: 'button',
    tabIndex: '-1',
    role: 'option',
    className: 'btn btn-success btn-lg',
  };
  const signProps = {
    style: {
      marginTop: '5px',
      width: '50px',
      height: '50px',
      padding: '10px',
    },
    className: 'img-rounded',
  };
  const translations = useSelector(getTranslations);
  const { xValue, yValue, correctAnswer } = props;

  return React.createElement(
    'div',
    { className: 'well text-center', style: { padding: '10px' } },
    React.createElement(
      'label',
      {
        htmlFor: 'equation',
      },
      i18n(translations, 'equation.label'),
      React.createElement(
        'div',
        { id: 'equation' },
        React.createElement(
          'button',
          { name: `number ${xValue}`, type: 'button', ...numberProps },
          xValue
        ),
        React.createElement('img', {
          src: multiply,
          alt: 'multiply',
          ...signProps,
        }),
        React.createElement(
          'button',
          { name: `by ${yValue}`, type: 'button', ...numberProps },
          yValue
        ),
        React.createElement('img', {
          src: equals,
          alt: 'equals',
          ...signProps,
        }),
        React.createElement(
          'button',
          { name: `answer ${correctAnswer}`, type: 'button', ...numberProps },
          correctAnswer
        )
      )
    )
  );
};

Equation.propTypes = {
  xValue: PropTypes.number.isRequired,
  yValue: PropTypes.number.isRequired,
  correctAnswer: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default Equation;
