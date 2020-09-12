import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import Equation from './Equation';
import happyFaceImg from './img/happyFace.png';
import sadFaceImg from './img/sadFace.png';
import { answerStatus } from './model/results';
import SelectAnswer from './SelectAnswer';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: 0,
      yValue: 0,
      correctAnswer: '?',
      possibleAnswers: [],
      isHappy: false,
      isSad: false,
    };
    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  componentDidMount() {
    this.initializeValues();
  }

  componentDidUpdate(prevProps) {
    const prevRange = prevProps.range;
    const { range } = this.props;
    if (!shallowequal(prevRange, range)) {
      this.initializeValues();
    }
  }

  onAnswerSelected(answer) {
    this.setState((state) => {
      const { xValue, yValue, startTime } = state;
      const { setResultValueAt } = this.props;
      const correctAnswer = xValue * yValue;
      if (answer === correctAnswer) {
        const answerState = { status: answerStatus.success, duration: Date.now() - startTime };
        setResultValueAt(answerState, xValue, yValue);
        return {
          correctAnswer,
          startTime: Date.now(),
          isHappy: true,
          isSad: false,
        };
      }
      const answerState = { status: answerStatus.failure, duration: 0 };
      setResultValueAt(answerState, xValue, yValue);
      return {
        correctAnswer,
        startTime: Date.now(),
        isHappy: false,
        isSad: true,
      };
    });
    this.timeoutCallback = setTimeout(() => {
      this.initializeValues();
    }, 2500);
  }

  getNumRange() {
    const { range } = this.props;
    const numRange = [];
    range.forEach((value, index) => {
      if (value) { numRange.push(index + 1); }
    });
    return numRange;
  }

  getRandomIntInclusive() {
    const numRange = this.getNumRange();
    const min = 0;
    const max = numRange.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return numRange[randomIndex];
  }

  getNumberOfUniqueValues() {
    const unique = [];
    const liczby = this.getNumRange();
    liczby.forEach((first) => liczby.forEach((second) => {
      if (unique.indexOf(first * second) === -1) unique.push(first * second);
    }));
    return unique.length;
  }

  getPossibleAnswers(xValue, yValue) {
    const { noOfAnswers } = this.props;
    const results = [xValue * yValue];
    const numberOfUniqueValues = this.getNumberOfUniqueValues();
    while (results.length < noOfAnswers
        && results.length < numberOfUniqueValues) {
      const randomValue = this.getRandomIntInclusive() * this.getRandomIntInclusive();
      if (results.findIndex((item) => item === randomValue) === -1) {
        results.push(randomValue);
      }
    }
    return results.sort((a, b) => a - b);
  }

  initializeValues() {
    this.setState((state, props) => {
      const { range } = props;
      const xValue = this.getRandomIntInclusive(range);
      const yValue = this.getRandomIntInclusive(range);
      return {
        xValue,
        yValue,
        startTime: Date.now(),
        possibleAnswers: this.getPossibleAnswers(xValue, yValue),
        correctAnswer: '?',
        isHappy: false,
        isSad: false,
      };
    });
  }

  handleImageClick() {
    clearTimeout(this.timeoutCallback);
    this.initializeValues();
  }

  render() {
    const {
      xValue, yValue, possibleAnswers, correctAnswer, isHappy, isSad,
    } = this.state;
    return (
      <>
        <Equation
          xValue={xValue}
          yValue={yValue}
          correctAnswer={correctAnswer}
        />
        <SelectAnswer
          possibleAnswers={possibleAnswers}
          correctAnswer={xValue * yValue}
          onAnswerSelected={this.onAnswerSelected}
        />
        {isHappy && (
          <div
            onClick={this.handleImageClick}
            onKeyPress={this.handleImageClick}
            tabIndex="0"
            role="button"
          >
            <img
              src={happyFaceImg}
              alt="Good job!"
              height="150"
            />
          </div>
        )}
        {isSad && (
          <div
            onClick={this.handleImageClick}
            onKeyPress={this.handleImageClick}
            tabIndex="0"
            role="button"
          >
            <img
              src={sadFaceImg}
              alt="Oh no!"
              height="150"
            />
          </div>
        )}
      </>
    );
  }
}

QuestionForm.propTypes = {
  range: PropTypes.arrayOf(PropTypes.bool).isRequired,
  noOfAnswers: PropTypes.number.isRequired,
  setResultValueAt: PropTypes.func.isRequired,
};

export default QuestionForm;
