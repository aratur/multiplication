import React from 'react';
import RangePicker from './RangePicker';
import QuestionForm from './QuestionForm';
import ResultsTable from './ResultsTable';
import { results } from './model/results';

class MultiplicationTable extends React.Component {
  constructor(props) {
    super(props);
    Object.assign(this, { ...props });
    this.state = {
      rangeValues: Array(this.size).fill(true),
      resultsArray: results(this.size),
    };
    this.setNewRangeValueAt = this.setNewRangeValueAt.bind(this);
    this.setResultValueAt = this.setResultValueAt.bind(this);
  }

  setNewRangeValueAt(value, at) {
    this.setState((state) => {
      const { rangeValues } = state;
      const newRangeValues = rangeValues.slice();
      newRangeValues[at] = value;
      return { rangeValues: newRangeValues };
    });
  }

  setResultValueAt(value, row, column) {
    this.setState((state) => {
      const { resultsArray } = state;
      // setValueAtRowCol returns a new instance of a resultsArray object
      const newResultsArray = resultsArray.setValueAtRowCol(value, row, column);
      return { resultsArray: newResultsArray };
    });
  }

  render() {
    const { rangeValues, resultsArray } = this.state;
    return (
      <div className="row">
        <QuestionForm
          range={rangeValues}
          noOfAnswers={this.noOfAnswers}
          setResultValueAt={this.setResultValueAt}
        />
        <RangePicker
          rangeValues={rangeValues}
          setNewRangeValueAt={this.setNewRangeValueAt}
          minimumNoOfSelectedValues={this.minimumNoOfSelectedValues}
        />
        <ResultsTable
          resultsArray={resultsArray}
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
