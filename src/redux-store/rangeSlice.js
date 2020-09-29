/* eslint "no-param-reassign": 0 */
import { createSlice } from '@reduxjs/toolkit';
import { resultStatus } from './resultsSlice';

const size = 10;
export const getInitialRange = () => {
  if (localStorage.range) {
    return JSON.parse(localStorage.range);
  }
  return Array(size).fill(true);
};
const initialRange = getInitialRange();
const noOfAnswers = 5;

export const getRangeNumbers = (rangeValues = initialRange) => {
  const numRange = [];
  rangeValues.forEach((value, index) => {
    if (value) { numRange.push(index + 1); }
  });
  return numRange;
};

const areThereSomeNotAnsweredQuestions = (resultValues) => {
  let result = false;
  Object.keys(resultValues).forEach((a) => {
    Object.keys(resultValues[a]).forEach((b) => {
      if (resultValues[a][b].status !== resultStatus.success) result = true;
    });
  });
  return result;
};

const getAllPossibleAnswers = (rangeValues, resultValues) => {
  const rangeNumbers = getRangeNumbers(rangeValues);
  const allPossibleAnswers = [];
  const areThereNotAnswered = areThereSomeNotAnsweredQuestions(resultValues);
  rangeNumbers.forEach((first) => rangeNumbers.forEach((second) => {
    // skip answers which were already answered correctly
    if (!areThereNotAnswered
      || (
        typeof resultValues[second] !== 'undefined'
        && typeof resultValues[second][first] !== 'undefined'
        && resultValues[second][first].status !== resultStatus.success
      )
    ) {
      allPossibleAnswers.push({
        xValue: first,
        yValue: second,
        orderBy: Math.random(),
      });
      //      console.log(areThereNotAnswered, resultValues[second][first], second, first);
    }
  }));
  allPossibleAnswers.sort((a, b) => a.orderBy - b.orderBy);
  return allPossibleAnswers;
};

const getNumberOfPossibleUniqueValues = (rangeValues) => {
  const rangeNumbers = getRangeNumbers(rangeValues);
  const unique = [];
  rangeNumbers.forEach((first) => rangeNumbers.forEach((second) => {
    if (unique.indexOf(first * second) === -1) unique.push(first * second);
  }));
  return unique.length;
};

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

const setNextQuestion = (state, resultValues) => {
  if ((typeof state.xValue === 'undefined'
    && typeof state.yValue === 'undefined')
    || state.allPossibleAnswers.length === 0
  ) {
    state.allPossibleAnswers = getAllPossibleAnswers(state.rangeValues, resultValues);
  }
  // if (state.allPossibleAnswers.length < 10) console.log(state.allPossibleAnswers);
  const { xValue, yValue } = state.allPossibleAnswers.pop();
  state.xValue = xValue;
  state.yValue = yValue;
  state.possibleAnswers = getNewPossibleAnswers(state.rangeValues, xValue, yValue);
};

export const rangeSlice = createSlice({
  name: 'range',
  initialState: {
    rangeValues: initialRange,
    allPossibleAnswers: [],
    xValue: undefined,
    yValue: undefined,
    possibleAnswers: [],
  },
  reducers: {
    setRangeValueAt: (state, action) => {
      const { newValue, at } = action.payload;
      state.rangeValues[at] = newValue;
      state.allPossibleAnswers = [];
      localStorage.range = JSON.stringify(state.rangeValues);
    },
    generateNextQuestion: (state, action) => {
      setNextQuestion(state, action.payload);
    },
    setInitialState: (state, action) => {
      state.xValue = undefined;
      state.yValue = undefined;
      setNextQuestion(state, action.payload);
    },
    addPossibleAnswer: (state, action) => {
      // add answer to all possible answers at 3 position from the end
      // this can be invoked by question component to allow repeating
      // incorrect answers in the near future
      if (action.payload) {
        const { xValue, yValue } = action.payload;
        if (typeof xValue === 'number'
          && typeof yValue === 'number') {
          if (state.allPossibleAnswers.length > 3) {
            state.allPossibleAnswers.splice(
              state.allPossibleAnswers.length - 2, 0, { xValue, yValue, orderBy: 0 },
            );
          } else state.allPossibleAnswers.push({ xValue, yValue, orderBy: 0 });
        }
      }
    },
  },
});

export const getRangeValues = (state) => state.range.rangeValues;
export const getPossibleAnswers = (state) => state.range.possibleAnswers;
export const getXValue = (state) => state.range.xValue;
export const getYValue = (state) => state.range.yValue;
export const {
  setRangeValueAt,
  generateNextQuestion,
  addPossibleAnswer,
  setInitialState,
} = rangeSlice.actions;
export default rangeSlice.reducer;
