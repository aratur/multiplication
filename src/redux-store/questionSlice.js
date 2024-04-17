/* eslint "no-param-reassign": 0 */
import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash.clonedeep';
import { SIZE } from './constants';
import shuffle from './shuffle';

export const range = [...Array(SIZE)].map((_, index) => index + 1);

// initialize an array of questions to ask
const allQuestions = range.map((x) => range.map((y) => [x, y])).flat(1);
const getShuffledQuestions = () => cloneDeep(shuffle(allQuestions));

const initialState = {
  status: 'idle', // 'idle', 'pending', 'answered'
  filter: 'all', // 'all', 'correct', 'incorrect',
  answer: -1,
  xValue: 0,
  yValue: 0,
  pending: cloneDeep(shuffle(allQuestions)),
  correct: [],
  incorrect: [],
  gems: 0,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setNext: (state) => {
      if (state.pending.length === 0) {
        state.pending = getShuffledQuestions();
        state.gems += 1;
        state.incorrect = [];
        state.correct = [];
      }
      const next = state.pending.pop();
      state.status = 'pending';
      [state.xValue, state.yValue] = next;
      state.answer = -1;
    },
    setAnswer: (state, action) => {
      const answer = action.payload;
      const { xValue, yValue } = state;
      const isCorrect = answer === xValue * yValue;
      state.answer = answer;
      state.status = 'answered';
      if (isCorrect) {
        state.correct.push([xValue, yValue]);
      } else {
        state.incorrect.push([xValue, yValue]);
        state.pending.unshift([xValue, yValue]);
      }
    },
    reset: (state) => ({
      ...initialState,
    }),
    showCorrect: (state) => {
      state.filter = 'correct';
    },
    showIncorrect: (state) => {
      state.filter = 'incorrect';
    },
    showAll: (state) => {
      state.filter = 'all';
    },
  },
});

export const getXValue = (state) => state.question.xValue;
export const getYValue = (state) => state.question.yValue;
export const getAnswer = (state) => state.question.answer;
export const getStatus = (state) => state.question.status;
export const getGems = (state) => state.question.gems;
// this is used by table cells to display status
// table cells are using primitive values to avoid React re-renders
export const getStatusAt = (state, x, y) => {
  if (
    state.question.filter !== 'incorrect' &&
    state.question.correct.some(([a, b]) => a === x && b === y)
  ) {
    return 'correct';
  }
  if (
    state.question.filter !== 'correct' &&
    state.question.incorrect.some(([a, b]) => a === x && b === y)
  ) {
    return 'incorrect';
  }
  return 'pending';
};
export const {
  setNext,
  setAnswer,
  reset,
  showAll,
  showCorrect,
  showIncorrect,
} = questionSlice.actions;

export default questionSlice.reducer;
