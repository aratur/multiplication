import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { getRangeValues, setRangeValueAt } from '../redux-store/rangeSlice';
import WarningAlert from './WarningAlert';
import { i18n, getTranslations } from '../redux-store/i18nSlice';

const Settings = (props) => {
  const styleButtonGroup = { marginTop: '5px', marginBottom: '5px' };
  const styleWell = {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
  };
  const { minimumNoOfSelectedValues } = props;
  const [warningVisible, setWarningVisibility] = useState(false);
  const rangeValues = useSelector(getRangeValues);
  const dispatch = useDispatch();
  const translations = useSelector(getTranslations);

  const onRangeButtonClicked = (e) => {
    const at = Number(e.target.textContent) - 1;
    const newRangeValues = rangeValues.slice();
    newRangeValues[at] = !newRangeValues[at];
    const newValue = newRangeValues[at];
    const numberOfSelectedValues = newRangeValues.reduce(
      (reducer, value) => reducer + Number(value)
    );
    if (numberOfSelectedValues >= minimumNoOfSelectedValues) {
      dispatch(setRangeValueAt({ newValue, at }));
      ReactGA.event({
        category: 'Editing',
        action: 'Range changed',
        value: numberOfSelectedValues,
      });
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
          {i18n(translations, 'settings.label')}
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
                key={String(`${index}-${value}`)}
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
        warningHeader={i18n(translations, 'settings.warningHeader')}
        warningMessage={i18n(
          translations,
          'settings.warningMessage',
          minimumNoOfSelectedValues
        )}
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
