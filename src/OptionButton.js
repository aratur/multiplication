import React from 'react';
import PropTypes from 'prop-types';

const OptionButton = (props) => {
  const style = {
    margin: "5px",
    width: "55px"
  }
  return (
    <button
      style={style}
      className={props.buttonClassName}
      onClick={props.handleOnClick}
      type="button"
    >
      {props.id}
    </button>
  )
};

OptionButton.propTypes = {
  buttonClassName: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default OptionButton;
