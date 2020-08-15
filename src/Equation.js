import React from 'react';
import PropTypes from 'prop-types';
import EquationSignButton from './EquationSignButton';
import EquationNumberButton from './EquationNumberButton';

//sample use without JSX
const Equation = (props) => {
  return React.createElement(
    "div"
    , {className:"jumbotron", style:{margin: "10px", padding: "10px"}}
    , React.createElement(EquationNumberButton, {value: props.xValue})
    , React.createElement(EquationSignButton, {value:"X"})
    , React.createElement(EquationNumberButton, {value:props.yValue})
    , React.createElement(EquationSignButton, {value:"="})
    , React.createElement(EquationNumberButton, {value:props.correctAnswer})
  );
};

Equation.propTypes = {
   xValue: PropTypes.number.isRequired,
   yValue: PropTypes.number.isRequired,
   correctAnswer: PropTypes.any.isRequired
};

export default Equation;
