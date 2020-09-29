import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Equation from './Equation';
import happyFaceImg from '../img/smile.svg';
import sadFaceImg from '../img/frown.svg';
import {
  resultStatus,
  setValueAtRowCol, getResultValues,
} from '../redux-store/resultsSlice';
import {
  getPossibleAnswers, getXValue, getYValue,
  generateNextQuestion, addPossibleAnswer, setInitialState,
} from '../redux-store/rangeSlice';
import SelectAnswer from './SelectAnswer';

const LandingPage = () => {
  const yValue = useSelector(getXValue);
  const xValue = useSelector(getYValue);
  const possibleAnswers = useSelector(getPossibleAnswers);
  const dispatch = useDispatch();
  const resultValues = useSelector(getResultValues);

  if (typeof yValue === 'undefined'
    && typeof xValue === 'undefined') {
    dispatch(setInitialState(resultValues));
  }
  const [correctAnswer, setCorrectAnswer] = useState('?');
  const [isHappy, setIsHappy] = useState(false);
  const [isSad, setIsSad] = useState(false);
  const [timeoutCallback, setTimeoutCallback] = useState(undefined);
  const [startTime, setStartTime] = useState(Date.now());

  const initializeValues = () => {
    setStartTime(Date.now());
    setCorrectAnswer('?');
    setIsHappy(false);
    setIsSad(false);
    dispatch(generateNextQuestion(resultValues));
  };

  useEffect(() => () => {
    clearTimeout(timeoutCallback);
  },
  [timeoutCallback]);

  const onAnswerSelected = (answer) => {
    const newCorrectAnswer = xValue * yValue;
    if (answer === newCorrectAnswer) {
      const answerState = {
        status: resultStatus.success,
        duration: Date.now() - startTime,
      };
      dispatch(setValueAtRowCol({ answerState, xValue, yValue }));
      setCorrectAnswer(newCorrectAnswer);
      setStartTime(Date.now());
      setIsHappy(true);
    } else {
      const answerState = {
        status: resultStatus.failure,
        duration: Date.now() - startTime,
      };
      // set answer and add it to the results matrix
      dispatch(setValueAtRowCol({ answerState, xValue, yValue }));
      dispatch(addPossibleAnswer({ xValue, yValue }));
      setCorrectAnswer(newCorrectAnswer);
      setStartTime(Date.now());
      setIsSad(true);
    }
    setTimeoutCallback(setTimeout(() => {
      initializeValues();
    }, 2500));
  };

  const handleNextQuestion = () => {
    clearTimeout(timeoutCallback);
    initializeValues();
  };

  return (
    <>
      <Equation
        xValue={xValue || 0}
        yValue={yValue || 0}
        correctAnswer={correctAnswer}
      />
      <SelectAnswer
        possibleAnswers={possibleAnswers}
        correctAnswer={xValue * yValue}
        onAnswerSelected={onAnswerSelected}
        handleNextQuestion={handleNextQuestion}
      />
      {isHappy && (
      <div
        onClick={handleNextQuestion}
        onKeyPress={handleNextQuestion}
        tabIndex="0"
        role="button"
      >
        <img
          src={happyFaceImg}
          alt="Good job!"
          height="150"
        />
      </div>
      )}
      {isSad && (
      <div
        onClick={handleNextQuestion}
        onKeyPress={handleNextQuestion}
        tabIndex="0"
        role="button"
      >
        <img
          src={sadFaceImg}
          alt="Oh no!"
          height="150"
        />
      </div>
      )}
    </>
  );
};

export default LandingPage;
