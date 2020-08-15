import React from 'react';

function EquationSignButton(props){
  const marginStyle = {
    margin: "5px",
    position: "relative",
    width: "38px"
  }
  return (
    <button
      type="button"
      className="btn btn-default"
      style={marginStyle}>{props.value}
    </button>
  );
}

export default EquationSignButton;
