import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  resultStatus, getResultValues,
  getResultsSize, resetResults,
} from './redux-store/resultsSlice';
import TableCell from './TableCell';

const ResultsTable = () => {
  const size = useSelector(getResultsSize);
  const values = useSelector(getResultValues);
  const dispatch = useDispatch();
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);

  const styleButtons = { margin: '5px' };
  const styleWell = { padding: '10px' };

  const getClassName = (row, col) => {
    const answerState = values[row][col];
    let result = null;
    if (showCorrect
      && answerState.status === resultStatus.success) result = 'success';
    if (showIncorrect
      && answerState.status === resultStatus.failure) result = 'danger';
    if (row === col) return result || 'active';
    return result;
  };

  const handleShowClick = (event) => {
    setShowCorrect(event.target.className === 'btn btn-success'
      ? !showCorrect : false);
    setShowIncorrect(event.target.className === 'btn btn-danger'
      ? !showIncorrect : false);
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
      <button
        type="button"
        className="btn btn-primary btn-xs"
        onClick={() => {
          dispatch(resetResults());
        }}
      >
        Usuń wyniki
      </button>
    </>
  );
};

export default ResultsTable;
