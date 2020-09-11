import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SelectAnswer = (props) => {
  const { onAnswerSelected, questionValues, correctAnswer } = props;
  const [wasAnswered, setWasAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(Infinity);
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

  const handleAnswerSelected = (e) => {
    const answer = Number(e.target.textContent);
    setUserAnswer(answer);
    setWasAnswered(true);
    onAnswerSelected(answer);
  };

  useEffect(() => {
    setWasAnswered(false);
  }, [questionValues]);

  return (
    <div className="well" style={{ padding: '10px' }}>
      <b>Wybierz poprawny wynik</b>
      <br />
      {questionValues
        .map((item) => (
          <button
            type="button"
            className={getButtonClassBasedOnAnswer(item)}
            style={optionButtonStyle}
            onClick={handleAnswerSelected}
            key={item}
            disabled={wasAnswered}
          >
            {item}
          </button>
        ))}
    </div>
  );
};

SelectAnswer.propTypes = {
  questionValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  correctAnswer: PropTypes.number.isRequired,
};

export default SelectAnswer;
