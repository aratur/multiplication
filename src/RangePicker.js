import React from 'react';
import RangeButton from './RangeButton';

function RangePicker(props) {

  //if Button was selected returns different className
  const getButtonClass = (id) => {
    return (id === props.selectedValue) ? "btn btn-success" : "btn btn-info";
  }
//<h4 className="h4" style={({"margin-right": 10})}>{props.label}</h4>
//, display: "flex" no wrapping of btn-group
  return (
      <div className="row text-center">
        <div className="btn-group" role="group" style={({marginTop:"5px", marginBottom: "5px"})} >
          {props.range.map( (id) =>
            <RangeButton
              buttonClassName={getButtonClass(id)}
              handleOnClick={props.handleOnClick}
              key={id}
              id={id}
            />)
          }
        </div>
      </div>
    );

}
export default RangePicker;
