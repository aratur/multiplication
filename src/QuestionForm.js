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
      questionValues: [],
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
    const { xValue, yValue, startTime } = this.state;
    const { setResultValueAt } = this.props;
    const correctAnswer = xValue * yValue;
    if (answer === correctAnswer) {
      const answerState = { status: answerStatus.success, duration: Date.now() - startTime };
      setResultValueAt(answerState, xValue, yValue);
      this.setState({
        correctAnswer,
        startTime: Date.now(),
        isHappy: true,
        isSad: false,
      });
    } else {
      const answerState = { status: answerStatus.failure, duration: 0 };
      setResultValueAt(answerState, xValue, yValue);
      this.setState({
        correctAnswer,
        startTime: Date.now(),
        isHappy: false,
        isSad: true,
      });
    }
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

  getQuestionValues(xValue, yValue) {
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
    const { range } = this.props;
    const xValue = this.getRandomIntInclusive(range);
    const yValue = this.getRandomIntInclusive(range);
    this.setState({
      xValue,
      yValue,
      startTime: Date.now(),
      questionValues: this.getQuestionValues(xValue, yValue),
      correctAnswer: '?',
      isHappy: false,
      isSad: false,
    });
  }

  handleImageClick() {
    if (this.timeoutCallback) clearTimeout(this.timeoutCallback);
    this.initializeValues();
  }

  render() {
    const {
      xValue, yValue, questionValues, correctAnswer, isHappy, isSad,
    } = this.state;
    return (
      <>
        <Equation
          xValue={xValue}
          yValue={yValue}
          correctAnswer={correctAnswer}
        />
        <SelectAnswer
          questionValues={questionValues}
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
