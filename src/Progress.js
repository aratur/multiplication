import React from 'react';
import PropTypes from 'prop-types';

function Progress(props) {
  const { results } = props;
  console.log(results);
  const getStyle = (value) => {
    if (value === 0) {
      return { backgroundColor: '#4d3a7d', width: '20px', height: '20px' };
    }
    return { backgroundColor: '#48ca3b', width: '20px', height: '20px' };
  };
  const renderColumns = (i) => {
    const columns = [];
    for (let j = 0; j < results[i].length; j++) {
      columns.push(
        <td
          key={(i * 10 + j)}
          style={getStyle(results[i][j])}
        />,
      );
    }
    return columns;
  };
  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < results.length; i++) {
      rows.push(<tr key={i}>{renderColumns(i)}</tr>);
    }
    return rows;
  };
  return (
    <div className="col text-center">
      <table className="table">
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}

Progress.propTypes = {
  results: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default Progress;
