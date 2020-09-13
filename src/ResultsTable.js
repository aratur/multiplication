import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { resultStatus } from './model/results';
import TableCell from './TableCell';

const ResultsTable = (props) => {
  const { size, resultsData } = props;
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showSlowest, setShowSlowest] = useState(false);

  const styleButtons = { margin: '5px' };
  const styleWell = { padding: '10px' };

  try {
    resultsData.getValueAtRowCol(size, size);
  } catch (error) {
    // when resultsData is smaller that table size
    return <div>Failed to render table with results</div>;
  }

  const getClassName = (row, col) => {
    const answerState = resultsData.getValueAtRowCol(row, col);
    let result = null;
    if (showCorrect
      && answerState.status === resultStatus.success) result = 'success';
    if (showIncorrect
      && answerState.status === resultStatus.failure) result = 'danger';
    if (showSlowest
      && resultsData.isSlowestValue(answerState.duration)) result = 'warning';
    if (row === col) return result || 'active';
    return result;
  };

  const handleShowClick = (event) => {
    setShowCorrect(event.target.className === 'btn btn-success'
      ? !showCorrect : false);
    setShowIncorrect(event.target.className === 'btn btn-danger'
      ? !showIncorrect : false);
    setShowSlowest(event.target.className === 'btn btn-warning'
      ? !showSlowest : false);
  };

  return (
    <>
      <div className="well" style={styleWell}>
        <b>Wybierz, które wyniki chcesz zobaczyć w tabeli</b>
        <div id="table-buttons-group">
          <button
            className="btn btn-success"
            type="button"
            style={styleButtons}
            onClick={handleShowClick}
          >
            Poprawne
          </button>
          <button
            className="btn btn-danger"
            type="button"
            style={styleButtons}
            onClick={handleShowClick}
          >
            Błędne
          </button>
          <button
            className="btn btn-warning"
            type="button"
            style={styleButtons}
            onClick={handleShowClick}
          >
            Najwolniejsze
          </button>
        </div>
      </div>
      <table className="table table-striped table-hover text-center">
        <caption>Tabliczka mnożenia</caption>
        <thead>
          <tr>
            <th className="active text-center" key="X">X</th>
            {Array(size).fill(0)
              .map((_, index) => (
                <th
                  className="info text-center"
                  key={`headerRow${String(index + 1)}`}
                >
                  {index + 1}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(size).fill(0).map((_, rowIndex) => rowIndex + 1)
            .map((row) => (
              <tr key={`row${String(row)}`}>
                {Array(size).fill(0).map((__, colIndex) => colIndex + 1)
                  .map((col) => (
                    <TableCell
                      row={row}
                      col={col}
                      getClassName={getClassName}
                      key={String(`cell${row}.${col}`)}
                    />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

ResultsTable.propTypes = {
  size: PropTypes.number.isRequired,
  resultsData: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ResultsTable;
