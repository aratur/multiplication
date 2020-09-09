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
    // compute no of unique values
    for (let i = 1; i < 11; i++) {
      this.computeUnique(i);
    }
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
    const { possibleAnswers } = this.props;
    const results = [xValue * yValue];
    while (results.length < possibleAnswers) {
      const randomValue = this.getRandomIntInclusive() * this.getRandomIntInclusive();
      if (results.findIndex((item) => item === randomValue) === -1) {
        results.push(randomValue);
      }
    }
    return results.sort((a, b) => a - b);
  }

  computeUnique(vars) {
    const { range } = this.props;
    //console.log(range);
    const unique = [];
    const liczby = Array(vars).fill(0).map((x, index) => index + 1);
    for (let l1 of liczby) {
      for (let l2 of liczby) {
        if(!unique || unique.indexOf(l1*l2) === -1){
          unique.push(l1*l2);
        }
      }
    }
    console.log(`Vars ${vars} return count ${unique.length} and values ${unique}`);
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
      <div className="row">
        <Equation
          xValue={xValue}
          yValue={yValue}
          correctAnswer={correctAnswer}
        />
        <div className="button-group">
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
        {this.renderInnerState()}
      </div>
    );
  }
}

QuestionForm.propTypes = {
  range: PropTypes.arrayOf(PropTypes.bool).isRequired,
  possibleAnswers: PropTypes.number.isRequired,
};

export default QuestionForm;
