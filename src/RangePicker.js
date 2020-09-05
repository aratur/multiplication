import React from 'react';
import PropTypes from 'prop-types';

const RangePicker = (props) => {
  //if Button was selected returns different className
  const getButtonClass = (id) => {
    return (id === props.selectedValue) ? "btn btn-success" : "btn btn-info";
  }
  // display: "flex" no wrapping of btn-group
  return (
        <div className="btn-group" role="group" style={({marginTop:"5px", marginBottom: "5px"})} >
          {props.range.map( (id) =>
            <button
              className={getButtonClass(id)}
              onClick={props.handleOnClick}
              key={id}
            >{id}</button>)
          }
        </div>
    );
};

RangePicker.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  selectedValue: PropTypes.number.isRequired
};

export default RangePicker;
