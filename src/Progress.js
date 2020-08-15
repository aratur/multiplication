import React from 'react';

function Progress(props){
  console.log(props.results);
  const getStyle = (value) => {
    if (value === 0){
      return {"backgroundColor": "#4d3a7d", width: "20px", height: "20px"};
    } else {
      return {"backgroundColor": "#48ca3b", width: "20px", height: "20px"};
    }
  }
  const renderColumns = (i) => {
    const columns = []
    for(let j=props.minValue; j<= props.maxValue; j++){
        columns.push(
          <td
            key={(i*10 + j)}
            style={getStyle(props.results[i][j])}
          ></td>);
    }
    return columns;
  }
  const renderRows = () => {
    const rows = []
    for(let i=props.minValue; i<= props.maxValue; i++){
      rows.push(<tr key={i}>{renderColumns(i)}</tr>);
    }
    return rows;
  }
  return (
    <div className="col text-center" >
    <table className="table">
      <tbody>
        {renderRows()}
      </tbody>
    </table>
    </div>
  );
}
export default Progress;
