import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getRangeValues, setRangeValueAt } from './redux-store/rangeSlice';
import WarningAlert from './WarningAlert';

const Settings = (props) => {
  const styleButtonGroup = { marginTop: '5px', marginBottom: '5px' };
  const styleWell = { padding: '10px' };
  const { minimumNoOfSelectedValues } = props;
  const [warningVisible, setWarningVisibility] = useState(false);
  const rangeValues = useSelector(getRangeValues);
  const dispatch = useDispatch();

  const onRangeButtonClicked = (e) => {
    const at = Number(e.target.textContent) - 1;
    const newRangeValues = rangeValues.slice();
    newRangeValues[at] = !newRangeValues[at];
    const newValue = newRangeValues[at];
    if (newRangeValues
      .reduce((reducer, value) => reducer + Number(value)) >= minimumNoOfSelectedValues) {
      dispatch(setRangeValueAt({ newValue, at }));
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
          <br />
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

Settings.propTypes = {
  minimumNoOfSelectedValues: PropTypes.number,
};

Settings.defaultProps = {
  minimumNoOfSelectedValues: 3,
};

export default Settings;
