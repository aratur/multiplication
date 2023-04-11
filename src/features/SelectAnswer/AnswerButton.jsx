import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnswer,
  getStatus,
  setAnswer,
  setNext,
} from '../../redux-store/questionSlice';

const AnswerButton = ({ answer, correctAnswer }) => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const storeAnswer = useSelector(getAnswer);

  const optionButtonStyle = {
    margin: '5px',
    width: '55px',
    height: '55px',
    padding: '0px',
  };

  const getButtonClassBasedOnAnswer = (item) => {
    if (status === 'pending') return 'btn btn-info btn-lg';
    if (storeAnswer !== correctAnswer) {
      if (item === storeAnswer) return 'btn btn-primary btn-lg';
    }
    if (item === correctAnswer) return 'btn btn-success btn-lg';
    return 'btn btn-info btn-lg';
  };

  const getStyleBasedOnState = () =>
    status === 'answered' && answer !== storeAnswer && answer !== correctAnswer
      ? { ...optionButtonStyle, visibility: 'hidden' }
      : optionButtonStyle;

  const handleAnswerSelected = (e) => {
    if (status === 'pending') {
      const answered = Number(e.target.textContent);
      dispatch(setAnswer(answered));
    } else if (status === 'answered') {
      dispatch(setNext());
    }
  };

  return (
    <button
      type="button"
      className={getButtonClassBasedOnAnswer(answer)}
      style={getStyleBasedOnState(answer)}
      onClick={handleAnswerSelected}
    >
      {answer}
    </button>
  );
};

AnswerButton.propTypes = {
  answer: PropTypes.number.isRequired,
  correctAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AnswerButton;
