import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import Equation from './Equation';
import happyFaceImg from './img/happyFace.png';
import sadFaceImg from './img/sadFace.png';
import { answerStatus } from './model/results';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.optionButtonStyle = {
      margin: '5px',
      width: '55px',
      height: '55px',
      padding: '0px',
    };
    this.state = {
      xValue: 0,
      yValue: 0,
      correctAnswer: '?',
      randomValues: [],
      isHappy: false,
      isSad: false,
      disableSelectAnswer: false,
    };
    this.onOptionSelected = this.onOptionSelected.bind(this);
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

  onOptionSelected(e) {
    const { xValue, yValue, startTime } = this.state;
    const { setResultValueAt } = this.props;
    const answer = Number(e.target.innerText);
    const correctAnswer = xValue * yValue;
    if (answer === correctAnswer) {
      const answerState = { status: answerStatus.success, duration: Date.now() - startTime };
      setResultValueAt(answerState, xValue, yValue);
      this.setState({
        correctAnswer,
        startTime: Date.now(),
        isHappy: true,
        isSad: false,
        disableSelectAnswer: true,
      });
    } else {
      const answerState = { status: answerStatus.failure, duration: 0 };
      setResultValueAt(answerState, xValue, yValue);
      this.setState({
        correctAnswer,
        startTime: Date.now(),
        isHappy: false,
        isSad: true,
        disableSelectAnswer: true,
      });
    }
    setTimeout(() => {
      this.initializeValues();
    }, 2000);
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

  getOptionsValues(xValue, yValue) {
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
      randomValues: this.getOptionsValues(xValue, yValue),
      correctAnswer: '?',
      isHappy: false,
      isSad: false,
      disableSelectAnswer: false,
    });
  }

  renderInnerState() {
    const { isHappy, isSad } = this.state;
    if (isHappy) {
      return <img src={happyFaceImg} alt="Good job!" height="200" />;
    } if (isSad) {
      return <img src={sadFaceImg} alt="Oh no!" height="200" />;
    }
    return null;
  }

  render() {
    const {
      xValue, yValue, randomValues, correctAnswer, disableSelectAnswer,
    } = this.state;
    return (
      <>
        <Equation
          xValue={xValue}
          yValue={yValue}
          correctAnswer={correctAnswer}
        />
        <div className="well" style={{ padding: '10px' }}>
          <b>Wybierz poprawny wynik</b>
          <br />
          {randomValues
            .map((item) => (
              <button
                type="button"
                className="btn btn-info btn-lg"
                style={this.optionButtonStyle}
                onClick={this.onOptionSelected}
                key={item}
                disabled={disableSelectAnswer}
              >
                {item}
              </button>
            ))}
        </div>
        {this.renderInnerState()}
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
