import React from 'react';
import RangePicker from './RangePicker';
import WarningAlert from './WarningAlert';
import QuestionForm from './QuestionForm';

class MultiplicationTable extends React.Component {
  maxValue = 10;
  minValue = 1
  rangePickerIncrement = 1;
  range = [];

  constructor(props){
    super(props);
    this.state = {
      fromValue: this.minValue,
      toValue: this.maxValue,
      canEdit: true,
      pickerWarningVisible: false
    }

    this.range = [];
    for(let i=this.state.fromValue;
            i<=this.state.toValue;
            i=i+this.rangePickerIncrement){
      this.range.push(i || 1);
    }

    this.onHideWarningMessage = this.onHideWarningMessage.bind(this);
  }

  onFromButtonClicked(e) {
    e.preventDefault();
    const selectedOption = Number(e.target.textContent);
    if (selectedOption < this.state.toValue){
      this.setState({
        fromValue: selectedOption
      });
    } else if (selectedOption < this.maxValue)
    {
      this.setState({
        fromValue: selectedOption,
        toValue: this.range.find(item => item > selectedOption)
      });
    } else {
      this.showWarning();
    }
  }

  onToButtonClicked(e) {
    e.preventDefault();
    const selectedOption = Number(e.target.textContent);
    if (selectedOption > this.state.fromValue){
      this.setState({
        toValue: selectedOption
      });
    } else if (selectedOption > this.minValue)
    {
      this.setState({
        fromValue: [...this.range]
          .sort((a,b) => b-a)
          .find(item => item < selectedOption),
        toValue: selectedOption
      });
    } else {
      this.showWarning();
    }
  }

  onHideWarningMessage(){
    this.setState({ pickerWarningVisible: false });
  }

  showWarning() {
    this.setState({
      pickerWarningVisible: true
    });
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
            label="From"
            selectedValue={this.state.fromValue}
            handleOnClick={this.onFromButtonClicked.bind(this)}
            range={this.range}
          />
          <RangePicker
            label="Do"
            selectedValue={this.state.toValue}
            handleOnClick={this.onToButtonClicked.bind(this)}
            range={this.range}
          />
          <QuestionForm
            fromValue={this.state.fromValue}
            toValue={this.state.toValue}
            minValue={this.minValue}
            maxValue={this.maxValue}
          />
        </div>
    );
  }
}

export default MultiplicationTable;
