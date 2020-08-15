import React from 'react';
import PropTypes from 'prop-types';

const RangeButton = (props) => {
  return (
    <button
      className={props.buttonClassName}
      onClick={props.handleOnClick}
      type="button"
    >
      {props.id}
    </button>
  )
};

RangeButton.propTypes = {
  buttonClassName: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default RangeButton;
