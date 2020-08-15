import React from 'react';
import PropTypes from 'prop-types';
import EquationSignButton from './EquationSignButton';
import EquationNumberButton from './EquationNumberButton';

 const Equation = (props) => {
  return (
    <div className="jumbotron" style={({margin: "10px", padding: "10px"})}>
      <EquationNumberButton value={props.xValue} />
      <EquationSignButton value="X" />
      <EquationNumberButton value={props.yValue} />
      <EquationSignButton value="=" />
      <EquationNumberButton value={props.correctAnswer} />
    </div>
  );
};

Equation.propTypes = {
   xValue: PropTypes.number.isRequired,
   yValue: PropTypes.number.isRequired,
   correctAnswer: PropTypes.string.isRequired
}

export default Equation;
