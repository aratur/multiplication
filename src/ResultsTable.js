import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { answerStatus } from './model/results';

const ResultsTable = (props) => {
  const { size, resultsArray } = props;
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showSlowest, setShowSlowest] = useState(false);

  const styleButtons = { margin: '5px' };
  const styleWell = { padding: '10px' };

  const getClassName = (col, row) => {
    const answerState = resultsArray.getValueAtRowCol(row, col);
    let result = null;
    if (showCorrect
      && answerState.status === answerStatus.success) result = 'success';
    if (showIncorrect
      && answerState.status === answerStatus.failure) result = 'danger';
    if (showSlowest
      && resultsArray.isSlowestValue(answerState.duration)) result = 'warning';
    if (row === col) return result || 'active';
    return result;
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
            onClick={() => setShowCorrect(!showCorrect)}
          >
            Poprawne
          </button>
          <button
            className="btn btn-danger"
            type="button"
            style={styleButtons}
            onClick={() => setShowIncorrect(!showIncorrect)}
          >
            Błędne
          </button>
          <button
            className="btn btn-warning"
            type="button"
            style={styleButtons}
            onClick={() => setShowSlowest(!showSlowest)}
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
                  .map((col) => (col === 1 ? (
                    <React.Fragment key={`fragment${String(col)}`}>
                      <td
                        className="info"
                        key={`firstCol${String(row)}`}
                      >
                        {row}
                      </td>
                      <td
                        className={getClassName(row, col)}
                        key={`data${String(row)}.0`}
                      >
                        {row}
                      </td>
                    </React.Fragment>
                  ) : (
                    <td
                      className={getClassName(row, col)}
                      key={`data${String(row)}.${String(col)}`}
                    >
                      {row * col}
                    </td>
                  )))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

ResultsTable.defaultProps = {
  size: 10,
};

ResultsTable.propTypes = {
  size: PropTypes.number,
  resultsArray: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ResultsTable;