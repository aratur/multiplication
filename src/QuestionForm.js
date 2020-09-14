import React from 'react';
import PropTypes from 'prop-types';
import Equation from './Equation';
import happyFaceImg from './img/happyFace.png';
import sadFaceImg from './img/sadFace.png';
import { resultStatus } from './model/results';
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
    if (prevRange !== range) {
      this.initializeValues();
    }
  }

  onAnswerSelected(answer) {
    this.setState((state) => {
      const { xValue, yValue, startTime } = state;
      const { setResultValueAt } = this.props;
      const correctAnswer = xValue * yValue;

      if (answer === correctAnswer) {
        const answerState = {
          status: resultStatus.success,
          duration: Date.now() - startTime,
        };
        setResultValueAt(answerState, xValue, yValue);
        return {
          correctAnswer,
          startTime: Date.now(),
          isHappy: true,
          isSad: false,
        };
      }

      const answerState = {
        status: resultStatus.failure,
        duration: Date.now() - startTime,
      };
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

  initializeValues() {
    this.setState(() => {
      const { range, noOfAnswers } = this.props;
      const xValue = range.getNewRandomValue();
      const yValue = range.getNewRandomValue();
      return {
        xValue,
        yValue,
        startTime: Date.now(),
        possibleAnswers: range.getPossibleAnswers(xValue, yValue, noOfAnswers),
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
  range: PropTypes.objectOf(PropTypes.func).isRequired,
  noOfAnswers: PropTypes.number.isRequired,
  setResultValueAt: PropTypes.func.isRequired,
};

export default QuestionForm;
