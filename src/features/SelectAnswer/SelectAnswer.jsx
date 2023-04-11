import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { i18n, getTranslations } from '../../redux-store/i18nSlice';
import { SIZE } from '../../redux-store/constants';
import shuffle from '../../redux-store/shuffle';
import AnswerButton from './AnswerButton';
import { range, getXValue, getYValue } from '../../redux-store/questionSlice';

const noOfAnswers = 5;

const SelectAnswer = (props) => {
  const translations = useSelector(getTranslations);
  const xValue = useSelector(getXValue);
  const yValue = useSelector(getYValue);
  const correctAnswer = xValue * yValue;

  const getAnswers = useCallback(
    (size) => {
      const randomXValues = shuffle(range);
      const randomYValues = shuffle(range);
      const randomResults = randomXValues.map(
        (v, index) => v * randomYValues[index]
      );

      const result = [correctAnswer].concat(
        randomResults.filter((v) => v !== correctAnswer)
      );
      result.splice(noOfAnswers);

      return shuffle(result);
    },
    [correctAnswer]
  );

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(getAnswers(SIZE));
  }, [getAnswers]);

  return (
    <div className="well text-center" style={{ padding: '10px' }}>
      <b>{i18n(translations, 'selectAnswer.label')}</b>
      <br />
      {answers &&
        answers.map((answer) => (
          <AnswerButton
            key={String(`${answer}`)}
            answer={answer}
            correctAnswer={correctAnswer}
          />
        ))}
    </div>
  );
};

export default SelectAnswer;
