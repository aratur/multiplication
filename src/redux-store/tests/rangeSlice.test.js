import store from '../store';
import {
  generateNextQuestion,
  getInitialRange,
  setInitialState,
  getRangeNumbers,
  addPossibleAnswer,
} from '../rangeSlice';
import { resultStatus, getNewResultsList } from '../resultsSlice';

const newResultsList = getNewResultsList(10);
const success = { status: resultStatus.success, duration: 1 };

beforeEach(() => {
  store.dispatch(setInitialState(newResultsList));
});

describe('Store - range', () => {
  it('should generate new questions set after using up initial questions', () => {
    const resultValues = store.getState().results.values;
    Array(100)
      .fill(0)
      .forEach(() => {
        store.dispatch(generateNextQuestion(resultValues));
      });
    expect(Object.keys(store.getState().range.allPossibleAnswers).length).toBe(
      99
    );
  });
  it('read range from memory', () => {
    const testObject = { key: 'value' };
    localStorage.range = JSON.stringify(testObject);
    const newObject = getInitialRange();
    expect(newObject).toStrictEqual(testObject);
  });
  it('generates all possible answers if nothing was answered correctly', () => {
    expect(Object.keys(store.getState().range.allPossibleAnswers).length).toBe(
      99
    );
  });
  it('generates possible answers without the ones that were already answered', () => {
    const resultValues = getNewResultsList(10);
    const rangeNumbers = getRangeNumbers(Array(10).fill(1));
    rangeNumbers.forEach((first) =>
      rangeNumbers.forEach((second) => {
        const sub = resultValues[first] || {};
        sub[second] = success;
        resultValues[first] = sub;
      })
    );
    resultValues[1][1] = { status: resultStatus.pending, duration: 0 };
    store.dispatch(setInitialState(resultValues));
    expect(store.getState().range.xValue).toBe(1);
    expect(store.getState().range.xValue).toBe(1);
    expect(Object.keys(store.getState().range.allPossibleAnswers).length).toBe(
      0
    );
  });
  it('returns an array of numbers corresponding to the selected settings', () => {
    // sample range, with first and last deselected
    const rangeValues = [0, 1, 1, 0];
    // should generate an array of the following rangeNumbers
    const expectedNumbers = [2, 3];
    expect(getRangeNumbers(rangeValues)).toStrictEqual(expectedNumbers);
  });
  it('should add a possible answer to a not empty array of allPossibleAnswers', () => {
    store.dispatch(addPossibleAnswer({ xValue: 3, yValue: 7 }));
    const answers = store.getState().range.allPossibleAnswers;
    expect(answers[answers.length - 3]).toStrictEqual({
      xValue: 3,
      yValue: 7,
      orderBy: 0,
    });
  });
  it('should add a possible answer to an empty array of allPossibleAnswers', () => {
    // pop all values from the list
    const resultValues = store.getState().results.values;
    Array(99)
      .fill(0)
      .forEach(() => {
        store.dispatch(generateNextQuestion(resultValues));
      });
    // add possible answer to an empty list
    store.dispatch(addPossibleAnswer({ xValue: 3, yValue: 7 }));
    // check results
    const answers = store.getState().range.allPossibleAnswers;
    expect(answers).toStrictEqual([{ xValue: 3, yValue: 7, orderBy: 0 }]);
  });
  it('should not modify allPossibleAnswers if payload is missing', () => {
    const before = store.getState().range.allPossibleAnswers.slice();
    store.dispatch(addPossibleAnswer());
    expect(store.getState().range.allPossibleAnswers).toStrictEqual(before);
  });
  it('should not modify if xValue or yValue are not type of number', () => {
    const before = store.getState().range.allPossibleAnswers.slice();
    store.dispatch(addPossibleAnswer({ xValue: 'jeden', yValue: 9 }));
    expect(store.getState().range.allPossibleAnswers).toStrictEqual(before);
    store.dispatch(addPossibleAnswer({ xValue: 33, yValue: 'dwa' }));
    expect(store.getState().range.allPossibleAnswers).toStrictEqual(before);
    store.dispatch(addPossibleAnswer({ 1: 1, 2: 3 }));
    expect(store.getState().range.allPossibleAnswers).toStrictEqual(before);
  });
  it('should return allPossibleAnswers with all values in case if everything was already answered', () => {
    const resultValues = getNewResultsList(10);
    const rangeNumbers = getRangeNumbers(Array(10).fill(1));
    rangeNumbers.forEach((first) =>
      rangeNumbers.forEach((second) => {
        const sub = resultValues[first] || {};
        sub[second] = success;
        resultValues[first] = sub;
      })
    );
    store.dispatch(setInitialState(resultValues));
    expect(Object.keys(store.getState().range.allPossibleAnswers).length).toBe(
      99
    );
  });
});
