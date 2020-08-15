import React from 'react';
import PropTypes from 'prop-types';

const EquationSignButton = (props) => {
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
};

EquationSignButton.propTypes = {
  value: PropTypes.string.isRequired
};

export default EquationSignButton;
