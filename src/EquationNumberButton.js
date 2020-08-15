import React from 'react';
import PropTypes from 'prop-types';

const EquationNumberButton = (props) => {
  const marginStyle = {
    margin: "5px",
    position: "relative",
    width: "55px"
  };

  return (
    <button
      type="button"
      className="btn btn-success btn-lg"
      style={marginStyle}>{props.value}
    </button>
  );
};

EquationNumberButton.propTypes = {
  value: PropTypes.any.isRequired
};

export default EquationNumberButton;
