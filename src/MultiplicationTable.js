import React from 'react';
import RangePicker from './RangePicker';
import QuestionForm from './QuestionForm';
import ResultsTable from './ResultsTable';
import { results } from './model/results';
import Range from './model/range';

class MultiplicationTable extends React.Component {
  constructor(props) {
    super(props);
    Object.assign(this, { ...props });
    this.state = {
      range: Range(this.size),
      resultsData: results(this.size),
    };
    this.setNewRangeValueAt = this.setNewRangeValueAt.bind(this);
    this.setResultValueAt = this.setResultValueAt.bind(this);
  }

  setNewRangeValueAt(value, at) {
    this.setState((state) => {
      const { range } = state;
      return { range: range.setRangeValueAt(value, at) };
    });
  }

  setResultValueAt(value, row, column) {
    this.setState((state) => {
      const { resultsData } = state;
      // setValueAtRowCol returns a new instance of a resultsData object
      const newResultsData = resultsData.setValueAtRowCol(value, row, column);
      return { resultsData: newResultsData };
    });
  }

  render() {
    const { range, resultsData } = this.state;
    const rangeValues = range.getState();
    return (
      <div className="row">
        <QuestionForm
          range={range}
          noOfAnswers={this.noOfAnswers}
          setResultValueAt={this.setResultValueAt}
        />
        <RangePicker
          rangeValues={rangeValues}
          setNewRangeValueAt={this.setNewRangeValueAt}
          minimumNoOfSelectedValues={this.minimumNoOfSelectedValues}
        />
        <ResultsTable
          resultsData={resultsData}
          size={this.size}
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
