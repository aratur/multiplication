const answerStatus = {
  success: 1,
  failure: -1,
  pending: 0,
};

const results = (size, newResultsArray, newSlowestValues) => {
  const defaultValue = { status: answerStatus.pending, duration: 0 };
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

  const areRowAndColNumbers = (row, col) => (
    typeof row === 'number' && typeof col === 'number'
  );
  const isRowAndColValid = (row, col) => (
    row > 0 && row <= size
    && col > 0 && col <= size);

  const getValueAtRowCol = (row, col) => {
    if (!areRowAndColNumbers(row, col)) throw new Error(`row (${row}) & col (${col}) must be numbers.`);
    if (!isRowAndColValid(row, col)) throw new Error(`row (${row}) & col (${col}) must be between 1 and size (${size}).`);
    return resultsArray[row][col];
  };

  const isDurationNumberAndGreaterThanZero = (duration) => typeof duration === 'number'
    && duration > 0;

  const isInputCorrect = ({ status, duration }, row, col) => {
    if (typeof status === 'undefined') return false;
    if (!isDurationNumberAndGreaterThanZero(duration)) return false;
    if (!areRowAndColNumbers(row, col)) return false;
    if (!isRowAndColValid(row, col)) return false;
    return true;
  };
  const setSlowestValue = (newDuration) => {
    if (!slowestValues) slowestValues = [];
    // first x elements added one by one, any logic goes only afterwards
    if (slowestValues.length < size) {
      slowestValues.push(newDuration);
    } else {
      // sort descending
      slowestValues.sort((a, b) => b - a);
      // if new duration is slower that an existing record
      if (slowestValues.finIndex((a) => a < newDuration) > -1) {
        // remove the fastest
        slowestValues.pop();
        // add at the end - it will be sorted at the next check
        slowestValues.push(newDuration);
      }
    }
  };
  const setValueAtRowCol = (value, row, col) => {
    if (isInputCorrect(value, row, col)) {
      resultsArray[row][col] = value;
      setSlowestValue(value.duration);
      return results(size, resultsArray, slowestValues);
    }
    console.error('Incorrect input for results.setValueAtRowCol');
    return this;
  };

  const isSlowestValue = (checkDuration) => (slowestValues || [])
    .findIndex((a) => checkDuration >= a) > -1;
  return {
    getValueAtRowCol, setValueAtRowCol, isSlowestValue,
  };
};

export { answerStatus, results };
