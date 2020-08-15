import React from 'react';

function OptionButton(props){
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
}

export default OptionButton;
