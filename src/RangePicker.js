import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WarningAlert from './WarningAlert';

const RangePicker = (props) => {
  const styleButtonGroup = { marginTop: '5px', marginBottom: '5px' };
  const styleWell = { padding: '10px' };
  const { rangeValues, minimumNoOfSelectedValues, setNewRangeValueAt } = props;
  const [warningVisible, setWarningVisibility] = useState(false);

  const onRangeButtonClicked = (e) => {
    const selectedRangeValueIndex = Number(e.target.textContent) - 1;
    const newRangeValues = rangeValues.slice();
    newRangeValues[selectedRangeValueIndex] = !newRangeValues[selectedRangeValueIndex];
    if (newRangeValues
      .reduce((reducer, value) => reducer + Number(value)) >= minimumNoOfSelectedValues) {
      setNewRangeValueAt(newRangeValues[selectedRangeValueIndex], selectedRangeValueIndex);
    } else {
      setWarningVisibility(true);
    }
  };

  const onHideWarningMessage = () => {
    setWarningVisibility(false);
  };

  return (
    <>
      <div className="well" style={styleWell}>
        <label htmlFor="range">
          Wybrany zakres liczb do nauki
          <div
            className="btn-group"
            role="group"
            style={styleButtonGroup}
            id="range"
          >
            {rangeValues.map((value, index) => (
              <button
                type="button"
                role="checkbox"
                aria-checked={value}
                name={`range option ${index + 1}`}
                className={value ? 'btn btn-success' : 'btn btn-info'}
                onClick={onRangeButtonClicked}
                key={String(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </label>
      </div>
      <WarningAlert
        warningVisible={warningVisible}
        warningCloseEventHandler={onHideWarningMessage}
        warningHeader="Nie tak szybko"
        warningMessage={`Zaznacz nie mniej liczb niż ${minimumNoOfSelectedValues}.`}
      />
    </>
  );
};

RangePicker.propTypes = {
  setNewRangeValueAt: PropTypes.func.isRequired,
  rangeValues: PropTypes.arrayOf(PropTypes.bool).isRequired,
  minimumNoOfSelectedValues: PropTypes.number,
};

RangePicker.defaultProps = {
  minimumNoOfSelectedValues: 1,
};

export default RangePicker;
