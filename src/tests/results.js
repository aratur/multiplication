import { resultStatus, results } from '../model/results';
// import { } from '@testing-library/react';

describe('resultStatus', () => {
  it('should not be modified without updating tests', () => {
    expect(resultStatus)
      .toStrictEqual({ success: 1, failure: -1, pending: 0 });
  });
});

const defaultValue = { status: resultStatus.pending, duration: 0 };
const correctInputValue = { status: resultStatus.success, duration: 1 };

describe('results', () => {
  it('should generate object size * size with default values', () => {
    const size = 2;
    const resultsData = results(size);
    expect(resultsData.getValueAtRowCol(size, size))
      .toStrictEqual(defaultValue);
    expect(resultsData.getValueAtRowCol(1, 1))
      .toStrictEqual(defaultValue);
  });
  it('getValueAtRowCol should return modified value', () => {
    const size = 2;
    const resultsData = results(size);
    const newValue = { status: resultStatus.failure, duration: 17 };
    const newValueResultsData = resultsData
      .setValueAtRowCol(newValue, size, size);
    expect(resultsData.getValueAtRowCol(size, size))
      .toStrictEqual(newValue);
    expect(newValueResultsData.getValueAtRowCol(size, size))
      .toStrictEqual(newValue);
  });
  it('getValueAtRowCol throws on wrong parameters', () => {
    const size = 2;
    const resultsData = results(size);
    const parametersOutsideOfBounds = () => resultsData
      .getValueAtRowCol(3, 4);
    expect(parametersOutsideOfBounds).toThrow(/3/);
    expect(parametersOutsideOfBounds).toThrow(/4/);

    const parameterOneNotaNumber = () => resultsData
      .getValueAtRowCol('one', 1);
    expect(parameterOneNotaNumber).toThrow(/one/);

    const parameterTwoNotaNumber = () => resultsData
      .getValueAtRowCol(1, 'two');
    expect(parameterTwoNotaNumber).toThrow(/two/);
  });
  it('setValueAtRowCol throws on wrong parameters', () => {
    const size = 2;
    const resultsData = results(size);
    const durationEqualZero = () => resultsData
      .setValueAtRowCol(defaultValue, 1, 1);
    expect(durationEqualZero).toThrow(/duration/i);
    expect(durationEqualZero).toThrow(/greater than 0/i);

    const undefinedStatus = () => resultsData
      .setValueAtRowCol({ status: undefined, duration: 1 }, 1, 1);
    expect(undefinedStatus).toThrow(/undefined/);

    const parametersOutsideOfBounds = () => resultsData
      .setValueAtRowCol(correctInputValue, 3, 4);
    expect(parametersOutsideOfBounds).toThrow(/3/);
    expect(parametersOutsideOfBounds).toThrow(/4/);

    const parameterOneNotaNumber = () => resultsData
      .setValueAtRowCol(correctInputValue, 'one', 1);
    expect(parameterOneNotaNumber).toThrow(/one/);

    const parameterTwoNotaNumber = () => resultsData
      .setValueAtRowCol(correctInputValue, 1, 'two');
    expect(parameterTwoNotaNumber).toThrow(/two/);
  });
  it('should return a new instance after setting new value', () => {
    const size = 2;
    const resultsData = results(size);
    const newResultsData = resultsData
      .setValueAtRowCol(correctInputValue, 1, 1);
    expect(resultsData).not.toBe(newResultsData);
  });
  it('should identify all first "size" changes as slowest', () => {
    const size = 5;
    const resultsData = results(size);
    const durations = [1, 4, 10, 1, 6];
    durations.map((thisDuration) => [
      thisDuration,
      resultsData.setValueAtRowCol({
        status: resultStatus.success,
        duration: thisDuration,
      }, 1, 1),
    ])
      .forEach(([aDuration, aResultsData]) => expect(aResultsData
        .isSlowestValue(aDuration)).toBe(true));
  });
  it('isSlowestValue should return false when used before changing any values', () => {
    const size = 2;
    const resultsData = results(size);
    // this should be correct as there if there were no answers
    // then there are should be no slowest values
    expect(resultsData.isSlowestValue(0))
      .toBe(false);
  });
  it('should identify correctly slowest durations after "size" changes', () => {
    const size = 2;
    const resultsData = results(size);
    const durations = [1, 4, 10, 1, 6];
    let newResultsData;
    durations.forEach((thisDuration) => {
      newResultsData = resultsData.setValueAtRowCol({
        status: resultStatus.success,
        duration: thisDuration,
      }, 1, 1);
    });
    expect(newResultsData.isSlowestValue(1)).toBe(false);
    expect(newResultsData.isSlowestValue(4)).toBe(false);
    expect(newResultsData.isSlowestValue(10)).toBe(true);
    expect(newResultsData.isSlowestValue(1)).toBe(false);
    expect(newResultsData.isSlowestValue(6)).toBe(true);
  });
});
