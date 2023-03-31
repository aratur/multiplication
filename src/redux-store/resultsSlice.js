/* eslint "no-param-reassign": 0 */
import { createSlice } from '@reduxjs/toolkit';

const defaultSize = 10;

export const resultStatus = {
  success: 1,
  failure: -1,
  pending: 0,
};

const defaultValue = { status: resultStatus.pending, duration: 0 };

const getInitialGems = () => {
  if (localStorage.gems) {
    return JSON.parse(localStorage.gems);
  }
  return 3;
};

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
  throw new Error(
    `row (${row}) & col (${col}) must be between 1 and size (${size}).`
  );
};

const isDurationGreaterThanZero = (duration) => {
  if (typeof duration === 'number' && duration > 0) return true;
  throw new Error(`Duration (${duration}) must be a number greater than 0`);
};

const isStatusCorrect = (status) => {
  if (typeof status !== 'undefined') return true;
  throw new Error("status can't be undefined.");
};

const isSolved = (values) => {
  const iterate = Array(defaultSize)
    .fill(1)
    .map((value, index) => index + 1);
  return (
    iterate.findIndex(
      (a) =>
        iterate.findIndex((b) => values[a][b].status !== resultStatus.success) >
        -1
    ) === -1
  );
};

const isInputCorrect = (size, { status, duration }, row, col) =>
  areRowAndColNumbers(row, col) &&
  isRowAndColValid(size, row, col) &&
  isStatusCorrect(status) &&
  isDurationGreaterThanZero(duration);

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    values: getNewResultsList(defaultSize),
    gems: getInitialGems(),
  },
  reducers: {
    setValueAtRowCol: (state, action) => {
      const { answerState, xValue, yValue } = action.payload;
      isInputCorrect(
        Object.keys(state.values).length,
        answerState,
        xValue,
        yValue
      );
      state.values[yValue][xValue] = answerState;
      if (isSolved(state.values)) {
        state.gems += 1;
        localStorage.gems = JSON.stringify(state.gems);
        localStorage.removeItem('multiplicationResults');
        state.values = getNewResultsList(defaultSize);
      }
      localStorage.multiplicationResults = JSON.stringify(state.values);
    },
    resetResults: (state) => {
      localStorage.removeItem('multiplicationResults');
      state.values = getNewResultsList(defaultSize);
    },
  },
});

export const getNoOfGems = (state) => state.results.gems;
export const getResultValues = (state) => state.results.values;
export const getResultsSize = (state) =>
  Object.keys(state.results.values).length;
export const { setValueAtRowCol, resetResults } = resultsSlice.actions;
export default resultsSlice.reducer;
