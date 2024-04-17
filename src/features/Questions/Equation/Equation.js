import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import multiply from '../../../assets/multiply.png';
import equals from '../../../assets/equals.png';
import { i18n, getTranslations } from '../../../redux-store/i18nSlice';
import {
  getXValue,
  getYValue,
  getAnswer,
  getStatus,
  setNext,
} from '../../../redux-store/questionSlice';

// without JSX
const Equation = () => {
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
  const dispatch = useDispatch();
  const xValue = useSelector(getXValue);
  const yValue = useSelector(getYValue);
  const answer = useSelector(getAnswer);
  const status = useSelector(getStatus);
  const correctAnswer = answer === -1 ? '?' : xValue * yValue;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(setNext());
    }
  }, [dispatch, status]);

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
          {
            name: `number ${xValue}`,
            'data-testid': 'question-left',
            type: 'button',
            ...numberProps,
          },
          xValue
        ),
        React.createElement('img', {
          src: multiply,
          alt: 'multiply',
          ...signProps,
        }),
        React.createElement(
          'button',
          {
            name: `by ${yValue}`,
            'data-testid': 'question-right',
            type: 'button',
            ...numberProps,
          },
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

export default Equation;
