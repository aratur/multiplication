import React from 'react';
import RangePicker from './RangePicker';
import QuestionForm from './QuestionForm';

class MultiplicationTable extends React.Component {
  constructor(props) {
    super(props);
    Object.assign(this, { ...props });
    // const getNewResultsList = (from, to) => {
    //   const result = {};
    //   for (let i = from; i <= to; i++) {
    //     const sub = {};
    //     for (let j = from; j <= to; j++) {
    //       sub[j] = 0;
    //     }
    //     result[i] = sub;
    //   }
    //   return result;
    // };
    this.state = {
      rangeValues: Array(this.size).fill(true),
      // resultsArray: getNewResultsList(1, this.size),
    };
    this.setNewRangeValueAt = this.setNewRangeValueAt.bind(this);
  }

  setNewRangeValueAt(value, at) {
    const { rangeValues } = this.state;
    const newRangeValues = rangeValues.slice();
    newRangeValues[at] = value;
    this.setState({
      rangeValues: newRangeValues,
    });
  }

  render() {
    const { rangeValues } = this.state;
    return (
      <div className="row">
        <QuestionForm
          range={rangeValues}
          noOfAnswers={this.noOfAnswers}
        />
        <RangePicker
          rangeValues={rangeValues}
          setNewRangeValueAt={this.setNewRangeValueAt}
          minimumNoOfSelectedValues={this.minimumNoOfSelectedValues}
        />
      </div>
    );
  }
}

MultiplicationTable.defaultProps = {
  minimumNoOfSelectedValues: 3,
  noOfAnswers: 5,
  size: 10,
};

export default MultiplicationTable;
