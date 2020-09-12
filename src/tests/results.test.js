import { answerStatus, results } from '../model/results';
// import { } from '@testing-library/react';

describe('answerStatus', () => {
  it('should not be modified without updating tests', () => {
    expect(answerStatus)
      .toStrictEqual({ success: 1, failure: -1, pending: 0 });
  });
});

const defaultValue = { status: answerStatus.pending, duration: 0 };

describe('results', () => {
  it('should generate object size * size with default values', () => {
    const size = 11;
    const resultsArray = results(size);
    expect(resultsArray.getValueAtRowCol(size, size))
      .toStrictEqual(defaultValue);
    expect(resultsArray.getValueAtRowCol(1, 1))
      .toStrictEqual(defaultValue);
  });
  it('getValueAtRowCol throws on wrong parameters', () => {
    const size = 11;
    const resultsArray = results(size);
    function parametersOutsideOfBounds() {
      resultsArray.getValueAtRowCol(12, 12);
    }
    expect(parametersOutsideOfBounds).toThrow(/12/);
    function parameterOneNotaNumber() {
      resultsArray.getValueAtRowCol('one', 1);
    }
    expect(parameterOneNotaNumber).toThrow(/one/);
    function parameterTwoNotaNumber() {
      resultsArray.getValueAtRowCol(1, 'two');
    }
    expect(parameterTwoNotaNumber).toThrow(/two/);
  });
});

// getValueAtRowCol, setValueAtRowCol, isSlowestValue,
