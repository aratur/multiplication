import React from 'react';
import PropTypes from 'prop-types';

//sample use without JSX
const Equation = (props) => {
  const numberProps = {
    style: {
      margin: "5px",
      position: "relative",
      width: "55px"
    },
    type: "button",
    className:"btn btn-success btn-lg"
  }
  const signProps = {
    style: {
      margin: "5px",
      position: "relative",
      width: "38px"
    },
    type: "button",
    className: "btn btn-default"
  }

  return React.createElement(
    "div"
    , {className:"jumbotron", style:{margin: "10px", padding: "10px"}}
    , React.createElement("button", numberProps, props.xValue)
    , React.createElement("button", signProps, "X")
    , React.createElement("button", numberProps, props.yValue)
    , React.createElement("button", signProps, "=")
    , React.createElement("button", numberProps, props.correctAnswer)
  );
};

Equation.propTypes = {
   xValue: PropTypes.number.isRequired,
   yValue: PropTypes.number.isRequired,
   correctAnswer: PropTypes.any.isRequired
};

export default Equation;
