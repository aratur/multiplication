import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getXValue,
  getYValue,
  getAnswer,
  setNext,
} from '../../../redux-store/questionSlice';

import happyFaceImg from '../../../assets/smile.svg';
import sadFaceImg from '../../../assets/frown.svg';

const HappySad = () => {
  const dispatch = useDispatch();
  const answer = useSelector(getAnswer);
  const xValue = useSelector(getXValue);
  const yValue = useSelector(getYValue);
  const isHappy = xValue * yValue === answer;
  const isVisible = answer !== -1;

  if (isVisible) {
    return (
      <button
        type="button"
        data-testid="happy-sad"
        onClick={() => dispatch(setNext())}
        tabIndex="0"
        style={{ backgroundColor: 'transparent', border: 'none' }}
      >
        {isHappy ? (
          <img src={happyFaceImg} alt="Good job!" height="150" />
        ) : (
          <img src={sadFaceImg} alt="Oh no!" height="150" />
        )}
      </button>
    );
  }
  return null;
};

export default HappySad;
