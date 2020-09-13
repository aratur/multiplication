import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { resultStatus } from './model/results';
import TableCell from './TableCell';

const ResultsTable = (props) => {
  const { size, resultsArray } = props;
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showSlowest, setShowSlowest] = useState(false);

  const styleButtons = { margin: '5px' };
  const styleWell = { padding: '10px' };

  const getClassName = (row, col) => {
    const answerState = resultsArray.getValueAtRowCol(row, col);
    let result = null;
    if (showCorrect
      && answerState.status === resultStatus.success) result = 'success';
    if (showIncorrect
      && answerState.status === resultStatus.failure) result = 'danger';
    if (showSlowest
      && resultsArray.isSlowestValue(answerState.duration)) result = 'warning';
    if (row === col) return result || 'active';
    return result;
  };

  try {
    resultsArray.getValueAtRowCol(size, size);
  } catch (error) {
    // when resultsArray is smaller that table size
    return <div>Failed to render table with results</div>;
  }

  return (
    <>
      <div className="well" style={styleWell}>
        <b>Wybierz, które wyniki chcesz zobaczyć w tabeli</b>
        <div id="table-buttons-group">
          <button
            className="btn btn-success"
            type="button"
            style={styleButtons}
            onClick={() => {
              setShowCorrect(!showCorrect);
              setShowIncorrect(false);
              setShowSlowest(false);
            }}
          >
            Poprawne
          </button>
          <button
            className="btn btn-danger"
            type="button"
            style={styleButtons}
            onClick={() => {
              setShowIncorrect(!showIncorrect);
              setShowCorrect(false);
              setShowSlowest(false);
            }}
          >
            Błędne
          </button>
          <button
            className="btn btn-warning"
            type="button"
            style={styleButtons}
            onClick={() => {
              setShowSlowest(!showSlowest);
              setShowCorrect(false);
              setShowIncorrect(false);
            }}
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
  resultsArray: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ResultsTable;
