import React from 'react';
import RangePicker from './RangePicker';
import WarningAlert from './WarningAlert';
import QuestionForm from './QuestionForm';

class MultiplicationTable extends React.Component {
  maxValue = 10;
  minValue = 1
  rangePickerIncrement = 1;
  range = [];

  componentDidCatch(error, errorInfo) {
     // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }


  constructor(props){
    super(props);
    this.state = {
      rangeValues: Array(10).fill(true),
      canEdit: true,
      pickerWarningVisible: false
    }
    this.onHideWarningMessage = this.onHideWarningMessage.bind(this);
    this.onRangeButtonClicked = this.onRangeButtonClicked.bind(this)
  }

  onRangeButtonClicked(e) {
    e.preventDefault();
    const selectedRangeValueIndex = Number(e.target.textContent) - 1;
    const newRangeValues = this.state.rangeValues.slice();
    newRangeValues[selectedRangeValueIndex]
      = !newRangeValues[selectedRangeValueIndex];
    if (newRangeValues
        .reduce((reducer, value) => reducer += Number(value))
        > 0){
      this.setState({
        rangeValues: newRangeValues
      });
    } else {
      this.setState({
        pickerWarningVisible: true
      });
    }
  }

  onHideWarningMessage(){
    this.setState({ pickerWarningVisible: false });
  }

  render() {
    return (
        <div className="row" >
          <WarningAlert
            warningVisible={this.state.pickerWarningVisible}
            warningCloseEventHandler={this.onHideWarningMessage}
            warningHeader="Wybierz inny zakres"
            warningMessage="Liczba Od musi być mniejsza od liczby Do"/>
          <RangePicker
            rangeValues={this.state.rangeValues}
            handleOnClick={this.onRangeButtonClicked}
          />

        </div>
    );
  }
}

export default MultiplicationTable;
