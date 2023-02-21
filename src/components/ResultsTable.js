import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  resultStatus,
  getResultValues,
  getResultsSize,
  resetResults,
} from '../redux-store/resultsSlice';
import { i18n, getTranslations } from '../redux-store/i18nSlice';
import TableCell from './TableCell';
import './ResultsTable.css';
import ModalYesOrNo from './ModalYesOrNo';

const ResultsTable = () => {
  const size = useSelector(getResultsSize);
  const values = useSelector(getResultValues);
  const translations = useSelector(getTranslations);
  const dispatch = useDispatch();
  const [showCorrect, setShowCorrect] = useState(true);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const styleButtons = { margin: '5px' };
  const styleWell = { padding: '10px' };

  const getClassName = useCallback(
    (row, col) => {
      const answerState = values[row][col];
      let result = null;
      if (showCorrect && answerState.status === resultStatus.success) {
        result = 'success';
      }
      if (showIncorrect && answerState.status === resultStatus.failure) {
        result = 'danger';
      }
      if (row === col) return result || 'active';
      return result;
    },
    [showCorrect, showIncorrect, values]
  );

  const handleShowClick = (event) => {
    setShowCorrect(
      event.target.className === 'btn btn-success' ? !showCorrect : false
    );
    setShowIncorrect(
      event.target.className === 'btn btn-danger' ? !showIncorrect : false
    );
  };

  const memoizedTableBody = useMemo(
    () =>
      Array(size)
        .fill(0)
        .map((_, rowIndex) => rowIndex + 1)
        .map((row) => (
          <tr key={`row${String(row)}`}>
            {Array(size)
              .fill(0)
              .map((__, colIndex) => colIndex + 1)
              .map((col) => (
                <TableCell
                  row={row}
                  col={col}
                  getClassName={getClassName}
                  key={String(`cell${row}.${col}`)}
                />
              ))}
          </tr>
        )),
    [getClassName, size]
  );

  const handleModalClicked = (event) => {
    if (event.target.value === 'yes') {
      dispatch(resetResults());
    }
    setIsModalVisible(false);
  };

  const handleRemoveResults = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <div className="well text-center" style={styleWell}>
        <b>{i18n(translations, 'results.buttonsLabel')}</b>
        <div id="table-buttons-group">
          <button
            className="btn btn-success"
            type="button"
            style={styleButtons}
            onClick={handleShowClick}
          >
            {i18n(translations, 'results.buttonCorrect')}
          </button>
          <button
            className="btn btn-danger"
            type="button"
            style={styleButtons}
            onClick={handleShowClick}
          >
            {i18n(translations, 'results.buttonIncorrect')}
          </button>
        </div>
      </div>
      <table className="table table-striped table-hover text-center">
        <caption>{i18n(translations, 'results.tableCaption')}</caption>
        <thead>
          <tr>
            <th className="active text-center" key="X">
              X
            </th>
            {Array(size)
              .fill(0)
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
        <tbody>{memoizedTableBody}</tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary btn-xs"
        onClick={handleRemoveResults}
      >
        {i18n(translations, 'results.buttonRemoveHistory')}
      </button>
      <ModalYesOrNo
        handleModalClicked={handleModalClicked}
        bodyText={i18n(translations, 'results.removeHistory.bodyText')}
        headerText={i18n(translations, 'results.removeHistory.headerText')}
        yesButtonText={i18n(
          translations,
          'results.removeHistory.yesButtonText'
        )}
        noButtonText={i18n(translations, 'results.removeHistory.noButtonText')}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default ResultsTable;
