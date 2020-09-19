import { createSlice } from '@reduxjs/toolkit';

export const resultStatus = {
  success: 1,
  failure: -1,
  pending: 0,
};

const defaultValue = { status: resultStatus.pending, duration: 0 };

export const getNewResultsList = (size) => {
  if (localStorage.multiplicationResults) {
    return JSON.parse(localStorage.multiplicationResults);
  }
  const result = {};
  for (let i = 1; i <= size; i++) {
    const sub = {};
    for (let j = 1; j <= size; j++) {
      sub[j] = defaultValue;
    }
    result[i] = sub;
  }
  return result;
};

const areRowAndColNumbers = (row, col) => {
  if (typeof row === 'number' && typeof col === 'number') return true;
  throw new Error(`row (${row}) & col (${col}) must be numbers.`);
};

const isRowAndColValid = (size, row, col) => {
  if (row > 0 && row <= size && col > 0 && col <= size) return true;
  throw new Error(`row (${row}) & col (${col}) must be between 1 and size (${size}).`);
};

const isDurationGreaterThanZero = (duration) => {
  if (typeof duration === 'number' && duration > 0) return true;
  throw new Error(`Duration (${duration}) must be a number greater than 0`);
};

const isStatusCorrect = (status) => {
  if (typeof status !== 'undefined') return true;
  throw new Error('status can\'t be undefined.');
};

const isInputCorrect = (size, { status, duration }, row, col) => areRowAndColNumbers(row, col)
    && isRowAndColValid(size, row, col)
    && isStatusCorrect(status)
    && isDurationGreaterThanZero(duration);

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    values: getNewResultsList(10),
  },
  reducers: {
    setValueAtRowCol: (state, action) => {
      const { answerState, xValue, yValue } = action.payload;
      isInputCorrect(Object.keys(state.values).length, answerState, xValue, yValue);
      state.values[xValue][yValue] = answerState;
      localStorage.multiplicationResults = JSON.stringify(state.values);
    },
    resetResults: (state) => {
      localStorage.removeItem('multiplicationResults');
      state.values = getNewResultsList(10);
    },
  },
});

export const getResultValues = (state) => state.results.values;
export const getResultsSize = (state) => Object.keys(state.results.values).length;
export const { setValueAtRowCol, resetResults } = resultsSlice.actions;
export default resultsSlice.reducer;
