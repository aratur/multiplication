import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { i18n, getTranslations } from '../redux-store/i18nSlice';

const SelectAnswer = (props) => {
  const {
    onAnswerSelected,
    possibleAnswers,
    correctAnswer,
    handleNextQuestion,
  } = props;
  const [wasAnswered, setWasAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(Infinity);
  const translations = useSelector(getTranslations);

  const optionButtonStyle = {
    margin: '5px',
    width: '55px',
    height: '55px',
    padding: '0px',
  };

  const getButtonClassBasedOnAnswer = (item) => {
    if (!wasAnswered) return 'btn btn-info btn-lg';
    if (userAnswer !== correctAnswer) {
      if (item === userAnswer) return 'btn btn-primary btn-lg';
      if (item === correctAnswer) return 'btn btn-success btn-lg';
    }
    if (item === correctAnswer) return 'btn btn-success btn-lg';
    return 'btn btn-info btn-lg';
  };

  const getStyleBasedOnState = (item) =>
    wasAnswered && item !== userAnswer && item !== correctAnswer
      ? { ...optionButtonStyle, visibility: 'hidden' }
      : optionButtonStyle;

  const handleAnswerSelected = (e) => {
    if (!wasAnswered) {
      const answer = Number(e.target.textContent);
      setUserAnswer(answer);
      setWasAnswered(true);
      onAnswerSelected(answer);
      ReactGA.event({
        category: 'Editing',
        action: 'Answer the question',
      });
    } else {
      handleNextQuestion();
    }
  };

  useEffect(() => {
    setWasAnswered(false);
  }, [possibleAnswers]);

  return (
    <div className="well text-center" style={{ padding: '10px' }}>
      <b>{i18n(translations, 'selectAnswer.label')}</b>
      <br />
      {possibleAnswers.map((item) => (
        <button
          type="button"
          className={getButtonClassBasedOnAnswer(item)}
          style={getStyleBasedOnState(item)}
          onClick={handleAnswerSelected}
          key={String(`${item}.${correctAnswer}`)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

SelectAnswer.propTypes = {
  possibleAnswers: PropTypes.arrayOf(PropTypes.number).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  correctAnswer: PropTypes.number.isRequired,
};

export default SelectAnswer;
