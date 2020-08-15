import React from 'react';

function RangeButton(props){
  return (
    <button
      className={props.buttonClassName}
      onClick={props.handleOnClick}
      type="button"
    >
      {props.id}
    </button>
  )
}

export default RangeButton;
