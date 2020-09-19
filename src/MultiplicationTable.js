import React from 'react';
import RangePicker from './RangePicker';
import QuestionForm from './QuestionForm';
import ResultsTable from './ResultsTable';

class MultiplicationTable extends React.Component {
  constructor(props) {
    super(props);
    Object.assign(this, { ...props });
  }

  render() {
    return (
      <div className="row">
        <QuestionForm />
        <RangePicker
          minimumNoOfSelectedValues={this.minimumNoOfSelectedValues}
        />
        <ResultsTable />
      </div>
    );
  }
}

MultiplicationTable.defaultProps = {
  minimumNoOfSelectedValues: 3,
};

export default MultiplicationTable;
