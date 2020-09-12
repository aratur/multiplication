import { answerStatus, results } from '../model/results';
// import { } from '@testing-library/react';

describe('answerStatus', () => {
  it('should not be modified without updating tests', () => {
    expect(answerStatus)
      .toStrictEqual({ success: 1, failure: -1, pending: 0 });
  });
});

const defaultValue = { status: answerStatus.pending, duration: 0 };
const correctInputValue = { status: answerStatus.success, duration: 1 };

describe('results', () => {
  it('should generate object size * size with default values', () => {
    const size = 2;
    const resultsArray = results(size);
    expect(resultsArray.getValueAtRowCol(size, size))
      .toStrictEqual(defaultValue);
    expect(resultsArray.getValueAtRowCol(1, 1))
      .toStrictEqual(defaultValue);
  });
  it('getValueAtRowCol throws on wrong parameters', () => {
    const size = 2;
    const resultsArray = results(size);
    const parametersOutsideOfBounds = () => resultsArray
      .getValueAtRowCol(3, 4);
    expect(parametersOutsideOfBounds).toThrow(/3/);
    expect(parametersOutsideOfBounds).toThrow(/4/);

    const parameterOneNotaNumber = () => resultsArray
      .getValueAtRowCol('one', 1);
    expect(parameterOneNotaNumber).toThrow(/one/);

    const parameterTwoNotaNumber = () => resultsArray
      .getValueAtRowCol(1, 'two');
    expect(parameterTwoNotaNumber).toThrow(/two/);
  });
  it('setValueAtRowCol throws on wrong parameters', () => {
    const size = 2;
    const resultsArray = results(size);
    const durationEqualZero = () => resultsArray
      .setValueAtRowCol(defaultValue, 1, 1);
    expect(durationEqualZero).toThrow(/duration/i);
    expect(durationEqualZero).toThrow(/greater than 0/i);

    const undefinedStatus = () => resultsArray
      .setValueAtRowCol({ status: undefined, duration: 1 }, 1, 1);
    expect(undefinedStatus).toThrow(/undefined/);

    const parametersOutsideOfBounds = () => resultsArray
      .setValueAtRowCol(correctInputValue, 3, 4);
    expect(parametersOutsideOfBounds).toThrow(/3/);
    expect(parametersOutsideOfBounds).toThrow(/4/);

    const parameterOneNotaNumber = () => resultsArray
      .setValueAtRowCol(correctInputValue, 'one', 1);
    expect(parameterOneNotaNumber).toThrow(/one/);

    const parameterTwoNotaNumber = () => resultsArray
      .setValueAtRowCol(correctInputValue, 1, 'two');
    expect(parameterTwoNotaNumber).toThrow(/two/);
  });
  it('should return a new instance after setting new value', () => {
    const size = 2;
    const resultsArray = results(size);
    const newResultsArray = resultsArray
      .setValueAtRowCol(correctInputValue, 1, 1);
    expect(resultsArray).not.toBe(newResultsArray);
    // const setDurationValueAt = () => resultsArray
    //   .setValueAtRowCol(correctInputValue, 3, 4);
  });
  it('should identify all first "size" changes as slowest', () => {
    const size = 5;
    const resultsArray = results(size);
    const durations = [1, 4, 10, 1, 6];
    durations.map((thisDuration) => [
      thisDuration,
      resultsArray.setValueAtRowCol({
        status: answerStatus.success,
        duration: thisDuration,
      }, 1, 1),
    ])
      .forEach(([aDuration, aResultsArray]) => expect(aResultsArray
        .isSlowestValue(aDuration)).toBe(true));
  });
  it('isSlowestValue should return false when used before changing any values', () => {
    const size = 2;
    const resultsArray = results(size);
    // this should be correct as there if there were no answers
    // then there are should be no slowest values
    expect(resultsArray.isSlowestValue(0))
      .toBe(false);
  });
  it('should identify correctly slowest durations after "size" changes', () => {
    const size = 2;
    const resultsArray = results(size);
    const durations = [1, 4, 10, 1, 6];
    let newResultsArray;
    durations.forEach((thisDuration) => {
      newResultsArray = resultsArray.setValueAtRowCol({
        status: answerStatus.success,
        duration: thisDuration,
      }, 1, 1);
    });
    expect(newResultsArray.isSlowestValue(1)).toBe(false);
    expect(newResultsArray.isSlowestValue(4)).toBe(false);
    expect(newResultsArray.isSlowestValue(10)).toBe(true);
    expect(newResultsArray.isSlowestValue(1)).toBe(false);
    expect(newResultsArray.isSlowestValue(6)).toBe(true);
  });
});

// getValueAtRowCol, setValueAtRowCol, isSlowestValue,
