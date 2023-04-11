import React from 'react';
import { useSelector } from 'react-redux';
import { i18n, getTranslations } from '../../redux-store/i18nSlice';
import TableCell from './TableCell';
import './Results.css';
import { SIZE } from '../../redux-store/constants';
import RemoveResults from './RemoveResults';
import FilterResults from './FilterResults';

const Results = () => {
  const translations = useSelector(getTranslations);

  const th = [...Array(SIZE)].map((_, index) => (
    <th className="info text-center" key={`headerRow${String(index + 1)}`}>
      {index + 1}
    </th>
  ));

  const tableBody = [...Array(SIZE)]
    .map((_, rowIndex) => rowIndex + 1)
    .map((row) => (
      <tr key={`row${String(row)}`}>
        {[...Array(SIZE)]
          .map((__, colIndex) => colIndex + 1)
          .map((col) => (
            <TableCell row={row} col={col} key={String(`cell_${row}.${col}`)} />
          ))}
      </tr>
    ));

  return (
    <>
      <FilterResults />
      <table className="table table-striped table-hover text-center">
        <caption>{i18n(translations, 'results.tableCaption')}</caption>
        <thead>
          <tr>
            <th className="active text-center" key="X">
              X
            </th>
            {th}
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <RemoveResults />
    </>
  );
};

export default Results;
