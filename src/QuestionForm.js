import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import Equation from './Equation';
import happyFaceImg from './img/happyFace.png';
import sadFaceImg from './img/sadFace.png';

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
      innerState: {
        isHappy: false,
        isSad: false,
        isWinner: false,
      },
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
    const { xValue, yValue } = this.state;
    const answer = Number(e.target.innerText);
    const correctAnswer = xValue * yValue;
    // const newResults = this.state.resultsArray;
    if (answer === correctAnswer) {
      // newResults[xValue][yValue] += 1;
      this.setState({
        correctAnswer,
        innerState: {
          isHappy: true,
          isSad: false,
          isWinner: false,
        },
      });
    } else {
      // newResults[xValue][yValue] -= 1;
      this.setState({
        correctAnswer,
        innerState: {
          isHappy: false,
          isSad: true,
          isWinner: false,
        },
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

  getOptionsValues(xValue, yValue) {
    const { noOfAnswers } = this.props;
    const results = [xValue * yValue];
    const allUniqueValues = this.getAllUniqueValues();
    while (results.length < noOfAnswers
        && results.length < allUniqueValues.length) {
      const randomValue = this.getRandomIntInclusive() * this.getRandomIntInclusive();
      if (results.findIndex((item) => item === randomValue) === -1) {
        results.push(randomValue);
      }
    }
    return results.sort((a, b) => a - b);
  }

  getAllUniqueValues() {
    const unique = [];
    const liczby = this.getNumRange();
    liczby.forEach((first) => liczby.forEach((second) => {
      if (unique.indexOf(first * second) === -1) unique.push(first * second);
    }));
    return unique;
  }

  initializeValues() {
    const { range } = this.props;
    const xValue = this.getRandomIntInclusive(range);
    const yValue = this.getRandomIntInclusive(range);
    this.setState({
      xValue,
      yValue,
      randomValues: this.getOptionsValues(xValue, yValue),
      correctAnswer: '?',
      innerState: {
        isHappy: false,
        isSad: false,
        isWinner: false,
      },
    });
  }

  renderInnerState() {
    const { innerState } = this.state;
    if (innerState.isHappy) {
      return <img src={happyFaceImg} alt="Good job!" height="200" />;
    } if (innerState.isSad) {
      return <img src={sadFaceImg} alt="Oh no!" height="200" />;
    }
    return null;
  }

  render() {
    const {
      xValue, yValue, randomValues, correctAnswer,
    } = this.state;
    return (
      <>
        <Equation
          xValue={xValue}
          yValue={yValue}
          correctAnswer={correctAnswer}
          optionButtonStyle
        />
        <div className="well" style={{ padding: '10px' }}>
          <label htmlFor="answers">
            Wybierz poprawny wynik
            <div id="answers">
              {randomValues
                .map((item) => (
                  <button
                    type="button"
                    className="btn btn-info btn-lg"
                    style={this.optionButtonStyle}
                    onClick={this.onOptionSelected}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </label>
        </div>
        {this.renderInnerState()}
      </>
    );
  }
}

QuestionForm.propTypes = {
  range: PropTypes.arrayOf(PropTypes.bool).isRequired,
  noOfAnswers: PropTypes.number.isRequired,
};

export default QuestionForm;
