import React from 'react';
import RangePicker from './RangePicker';
import WarningAlert from './WarningAlert';
import QuestionForm from './QuestionForm';

class MultiplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.minimumNoOfSelectedValues = 3;
    this.possibleAnswers = 5;
    this.size = 10;
    const getNewResultsList = (from, to) => {
      const result = {};
      for (let i = from; i <= to; i++) {
        const sub = {};
        for (let j = from; j <= to; j++) {
          sub[j] = 0;
        }
        result[i] = sub;
      }
      return result;
    };
    this.state = {
      rangeValues: Array(this.size).fill(true),
      pickerWarningVisible: false,
      resultsArray: getNewResultsList(1, this.size),
    };

    this.onHideWarningMessage = this.onHideWarningMessage.bind(this);
    this.onRangeButtonClicked = this.onRangeButtonClicked.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  onRangeButtonClicked(e) {
    e.preventDefault();
    const selectedRangeValueIndex = Number(e.target.textContent) - 1;
    const state = { ...this.state };
    const newRangeValues = state.rangeValues.slice();
    newRangeValues[selectedRangeValueIndex] = !newRangeValues[selectedRangeValueIndex];
    if (newRangeValues
      .reduce((reducer, value) => reducer + Number(value)) >= this.minimumNoOfSelectedValues) {
      this.setState({
        rangeValues: newRangeValues,
      });
    } else {
      console.log(this.state);
      this.setState({
        pickerWarningVisible: true,
      });
    }
  }

  onHideWarningMessage() {
    this.setState({ pickerWarningVisible: false });
  }

  render() {
    const { pickerWarningVisible, rangeValues } = this.state;
    return (
      <div className="row">
        <WarningAlert
          warningVisible={pickerWarningVisible}
          warningCloseEventHandler={this.onHideWarningMessage}
          warningHeader="Wybierz inny zakres"
          warningMessage="Liczba Od musi być mniejsza od liczby Do"
        />
        <RangePicker
          rangeValues={rangeValues}
          handleOnClick={this.onRangeButtonClicked}
        />
        <QuestionForm
          range={rangeValues}
          possibleAnswers={this.possibleAnswers}
        />
      </div>
    );
  }
}

export default MultiplicationTable;
