import React from 'react';
import PropTypes from 'prop-types';

const WarningAlert = (props) => {
  const warningStyle = {
    marginTop:"5px",
    marginBottom: "5px"
  };

  if (props.warningVisible) {
    return (
      <div
        className="alert alert-dismissable alert-info"
        style={warningStyle}
      >
        <button
          type="button"
          className="close"
          onClick={props.warnigCloseEventHandler}
        >×</button>
        <h4>{props.warningHeader}</h4>
        <p>{props.warningMessage}</p>
      </div>);
  } else return null;
};

WarningAlert.propTypes = {
  warnigCloseEventHandler: PropTypes.func.isRequired,
  warningHeader: PropTypes.string.isRequired,
  warningMessage: PropTypes.string.isRequired
};

export default WarningAlert;
