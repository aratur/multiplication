const Range = (size, oldState) => {
  const state = oldState || Array(size).fill(true);
  const getState = () => state.slice();
  const getNumRange = () => {
    const numRange = [];
    state.forEach((value, index) => {
      if (value) { numRange.push(index + 1); }
    });
    return numRange;
  };
  const getNewRandomValue = () => {
    const numRange = getNumRange();
    const min = 0;
    const max = numRange.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return numRange[randomIndex];
  };
  const getNumberOfUniqueValues = () => {
    const unique = [];
    const liczby = getNumRange();
    liczby.forEach((first) => liczby.forEach((second) => {
      if (unique.indexOf(first * second) === -1) unique.push(first * second);
    }));
    return unique.length;
  };
  const getPossibleAnswers = (xValue, yValue, noOfAnswers) => {
    const results = [xValue * yValue];
    const numberOfUniqueValues = getNumberOfUniqueValues();
    while (results.length < noOfAnswers
        && results.length < numberOfUniqueValues) {
      const randomValue = getNewRandomValue() * getNewRandomValue();
      if (results.findIndex((item) => item === randomValue) === -1) {
        results.push(randomValue);
      }
    }
    return results.sort((a, b) => a - b);
  };
  const setRangeValueAt = (value, at) => {
    state[at] = value;
    return Range(size, state);
  };

  return {
    getState,
    getNewRandomValue,
    getPossibleAnswers,
    setRangeValueAt,
  };
};

export default Range;
