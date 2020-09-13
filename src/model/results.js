const resultStatus = {
  success: 1,
  failure: -1,
  pending: 0,
};

const results = (size, newResultsArray, newSlowestValues) => {
  const defaultValue = { status: resultStatus.pending, duration: 0 };

  const getNewResultsList = () => {
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
  const resultsArray = newResultsArray || getNewResultsList();
  let slowestValues = newSlowestValues || undefined;

  const areRowAndColNumbers = (row, col) => {
    if (typeof row === 'number' && typeof col === 'number') return true;
    throw new Error(`row (${row}) & col (${col}) must be numbers.`);
  };

  const isRowAndColValid = (row, col) => {
    if (row > 0 && row <= size && col > 0 && col <= size) return true;
    throw new Error(`row (${row}) & col (${col}) must be between 1 and size (${size}).`);
  };

  const getValueAtRowCol = (row, col) => {
    areRowAndColNumbers(row, col);
    isRowAndColValid(row, col);
    return resultsArray[row][col];
  };

  const isDurationGreaterThanZero = (duration) => {
    if (typeof duration === 'number' && duration > 0) return true;
    throw new Error(`Duration (${duration}) must be a number greater than 0`);
  };

  const isStatusCorrect = (status) => {
    if (typeof status !== 'undefined') return true;
    throw new Error('status can\'t be undefined.');
  };

  const isInputCorrect = ({ status, duration }, row, col) => areRowAndColNumbers(row, col)
      && isRowAndColValid(row, col)
      && isStatusCorrect(status)
      && isDurationGreaterThanZero(duration);

  const setSlowestValue = (newDuration) => {
    if (!slowestValues) slowestValues = [];
    // first x elements added one by one, any logic goes only afterwards
    if (slowestValues.length < size) {
      slowestValues.push(newDuration);
    } else {
      // sort descending
      slowestValues.sort((a, b) => b - a);
      // if new duration is slower that an existing record
      if (slowestValues.findIndex((a) => a < newDuration) > -1) {
        // remove the fastest
        slowestValues.pop();
        // add at the end - it will be sorted at the next check
        slowestValues.push(newDuration);
      }
    }
  };

  const setValueAtRowCol = (value, row, col) => {
    isInputCorrect(value, row, col);
    resultsArray[row][col] = value;
    setSlowestValue(value.duration);
    return results(size, resultsArray, slowestValues);
  };

  const isSlowestValue = (checkDuration) => (slowestValues || [])
    .findIndex((a) => checkDuration >= a) > -1;

  return {
    getValueAtRowCol, setValueAtRowCol, isSlowestValue,
  };
};

export { resultStatus, results };
