import store from '../redux-store/store';
import {
  resultStatus, setValueAtRowCol, getNewResultsList,
} from '../redux-store/resultsSlice';

const setStatusDurationAtRowCol = (status, duration, row, col) => {
  const answerState = { status, duration };
  const payload = { answerState, xValue: row, yValue: col };
  store.dispatch(setValueAtRowCol(payload));
};

describe('Store - results', () => {
  it('setValueAtRowCol throws on duration equal to zero', () => {
    const durationEqualZero = () => setStatusDurationAtRowCol(
      resultStatus.pending, 0, 1, 1,
    );
    expect(durationEqualZero).toThrow(/duration/i);
    expect(durationEqualZero).toThrow(/greater than 0/i);
  });

  it('setValueAtRowCol throws on undefined state', () => {
    const undefinedStatus = () => setStatusDurationAtRowCol(
      undefined, 1, 1, 1,
    );
    expect(undefinedStatus).toThrow(/undefined/);
  });

  it('setValueAtRowCol throws on out of bounds', () => {
    const parametersOutsideOfBounds = () => setStatusDurationAtRowCol(
      resultStatus.success, 1, 11, 12,
    );
    expect(parametersOutsideOfBounds).toThrow(/11/);
    expect(parametersOutsideOfBounds).toThrow(/12/);
  });

  it('setValueAtRowCol throws on parameter one not a number', () => {
    const parametersOutsideOfBounds = () => setStatusDurationAtRowCol(
      resultStatus.success, 1, 'one', 1,
    );
    expect(parametersOutsideOfBounds).toThrow(/one/);
  });

  it('setValueAtRowCol throws on parameter two not a number', () => {
    const parametersOutsideOfBounds = () => setStatusDurationAtRowCol(
      resultStatus.success, 1, 1, 'two',
    );
    expect(parametersOutsideOfBounds).toThrow(/two/);
  });

  describe('resultStatus', () => {
    it('should not be modified without updating tests', () => {
      expect(resultStatus)
        .toStrictEqual({ success: 1, failure: -1, pending: 0 });
    });
  });

  it('should generate object 10 x 10 with default values', () => {
    const size = 10;
    const defaultValue = { status: resultStatus.pending, duration: 0 };
    const resultValues = store.getState().results.values;
    expect(resultValues[size][size])
      .toStrictEqual(defaultValue);
    expect(resultValues[1][1])
      .toStrictEqual(defaultValue);
  });

  it('getValueAtRowCol should modify value at proper coordinates', () => {
    const xValue = 10;
    const yValue = 10;
    const status = resultStatus.failure;
    const duration = 1843;
    setStatusDurationAtRowCol(status, duration, xValue, yValue);
    expect(store.getState().results.values[xValue][yValue])
      .toStrictEqual({ status, duration });
  });

  it('read results from memory', () => {
    const testObject = { key: 'value' };
    localStorage.multiplicationResults = JSON.stringify(testObject);
    const newObject = getNewResultsList(10);
    expect(newObject).toStrictEqual(testObject);
  });
});
