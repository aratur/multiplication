import React from 'react';
import PropTypes from 'prop-types';

const RangePicker = (props) => {
  // display: "flex" no wrapping of btn-group
  return (
        <div
          className="btn-group" role="group"
          style={({marginTop:"5px", marginBottom: "5px"})}
        >
          {props.rangeValues.map( (value, index) =>
            <button
              role="checkbox" aria-checked={value}
              className={value ? "btn btn-success" : "btn btn-info"}
              onClick={props.handleOnClick}
              key={index}
            >{index + 1}</button>)
          }
        </div>
    );
};

RangePicker.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  rangeValues: PropTypes.array.isRequired
};

export default RangePicker;
