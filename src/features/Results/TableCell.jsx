import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getStatusAt } from '../../redux-store/questionSlice';

const TableCell = (props) => {
  const { row, col } = props;
  const status = useSelector((state) => getStatusAt(state, row, col));

  const getClassName = () => {
    let result = null;
    if (status === 'correct') {
      result = 'success';
    }
    if (status === 'incorrect') {
      result = 'danger';
    }
    if (row === col) return result || 'active';
    return result;
  };

  const className = getClassName();

  return col === 1 ? (
    <>
      <td className="info" key={`firstCol${String(row)}`}>
        {row}
      </td>
      <td className={className} key={`data${String(row)}.0`}>
        {row}
      </td>
    </>
  ) : (
    <td className={className} key={`data${String(row)}.${String(col)}`}>
      {row * col}
    </td>
  );
};

TableCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default TableCell;
