import React from 'react';
import PropTypes from 'prop-types';

const TableCell = (props) => {
  const { row, col, getClassName } = props;
  const className = getClassName(row, col);
  return (
    (col === 1) ? (
      <React.Fragment key={`fragment${String(col)}`}>
        <td
          className="info"
          key={`firstCol${String(row)}`}
        >
          {row}
        </td>
        <td
          className={className}
          key={`data${String(row)}.0`}
        >
          {row}
        </td>
      </React.Fragment>
    ) : (
      <td
        className={className}
        key={`data${String(row)}.${String(col)}`}
      >
        {row * col}
      </td>
    )
  );
};

TableCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  getClassName: PropTypes.func.isRequired,
};

export default TableCell;
