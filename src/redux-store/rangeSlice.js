/* eslint "no-param-reassign": 0 */
import { createSlice } from '@reduxjs/toolkit';

const size = 10;
export const getInitialRange = () => {
  if (localStorage.range) {
    return JSON.parse(localStorage.range);
  }
  return Array(size).fill(true);
};
const initialRange = getInitialRange();
const noOfAnswers = 5;

const getRangeNumbers = (rangeValues = initialRange) => {
  const numRange = [];
  rangeValues.forEach((value, index) => {
    if (value) { numRange.push(index + 1); }
  });
  return numRange;
};

const getAllPossibleAnswers = (rangeValues) => {
  const rangeNumbers = getRangeNumbers(rangeValues);
  const allPossibleAnswers = [];
  rangeNumbers.forEach((first) => rangeNumbers.forEach((second) => {
    allPossibleAnswers.push({
      xValue: first,
      yValue: second,
      orderBy: Math.random(),
    });
  }));
  allPossibleAnswers.sort((a, b) => a.orderBy - b.orderBy);
  return allPossibleAnswers;
};

const initialAllPossibleValues = getAllPossibleAnswers(initialRange);

const getNumberOfPossibleUniqueValues = (rangeValues) => {
  const rangeNumbers = getRangeNumbers(rangeValues);
  const unique = [];
  rangeNumbers.forEach((first) => rangeNumbers.forEach((second) => {
    if (unique.indexOf(first * second) === -1) unique.push(first * second);
  }));
  return unique.length;
};

const { xValue: initialXValue, yValue: initialYValue } = initialAllPossibleValues.pop();

export const getNewRandomValue = (rangeValues) => {
  const rangeNumbers = getRangeNumbers(rangeValues);
  const min = 0;
  const max = rangeNumbers.length - 1;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  return rangeNumbers[randomIndex];
};

export const getNewPossibleAnswers = (rangeValues, xValue, yValue) => {
  const results = [xValue * yValue];
  const numberOfUniqueValues = getNumberOfPossibleUniqueValues();
  while (results.length < noOfAnswers
      && results.length < numberOfUniqueValues) {
    const randomValue = getNewRandomValue(rangeValues) * getNewRandomValue(rangeValues);
    if (results.findIndex((item) => item === randomValue) === -1) {
      results.push(randomValue);
    }
  }
  return results.sort((a, b) => a - b);
};

const setNextQuestion = (state) => {
  const { xValue, yValue } = state.allPossibleAnswers.pop();
  if (state.allPossibleAnswers.length === 0) {
    state.allPossibleAnswers = getAllPossibleAnswers(state.rangeValues);
  }
  state.xValue = xValue;
  state.yValue = yValue;
  state.possibleAnswers = getNewPossibleAnswers(state.rangeValues, xValue, yValue);
};

export const rangeSlice = createSlice({
  name: 'range',
  initialState: {
    rangeValues: initialRange,
    allPossibleAnswers: initialAllPossibleValues,
    xValue: initialXValue,
    yValue: initialYValue,
    possibleAnswers: getNewPossibleAnswers(initialRange, initialXValue, initialYValue),
  },
  reducers: {
    setRangeValueAt: (state, action) => {
      const { newValue, at } = action.payload;
      state.rangeValues[at] = newValue;
      state.allPossibleAnswers = getAllPossibleAnswers(state.rangeValues);
      localStorage.range = JSON.stringify(state.rangeValues);
      setNextQuestion(state);
    },
    generateNextQuestion: (state) => {
      setNextQuestion(state);
    },
  },
});

export const getRangeValues = (state) => state.range.rangeValues;
export const getPossibleAnswers = (state) => state.range.possibleAnswers;
export const getXValue = (state) => state.range.xValue;
export const getYValue = (state) => state.range.yValue;
export const { setRangeValueAt, generateNextQuestion } = rangeSlice.actions;
export default rangeSlice.reducer;
