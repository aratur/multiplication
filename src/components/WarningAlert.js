import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const WarningAlert = (props) => {
  const { warningHeader, warningMessage } = props;

  const warningStyle = {
    marginTop: '5px',
    marginBottom: '5px',
  };
  const { warningVisible, warningCloseEventHandler } = props;

  useEffect(() => {
    let cleanup;
    if (warningVisible) {
      cleanup = setTimeout(() => {
        warningCloseEventHandler();
      }, 4000);
    }
    return () => {
      if (cleanup) {
        clearTimeout(cleanup);
      }
    };
  }, [warningVisible, warningCloseEventHandler]);

  if (warningVisible) {
    return (
      <div className="alert alert-dismissable alert-info" style={warningStyle}>
        <button
          type="button"
          aria-label="close alert"
          className="close"
          onClick={warningCloseEventHandler}
        >
          x
        </button>
        <h4>{warningHeader}</h4>
        <p>{warningMessage}</p>
      </div>
    );
  }
  return null;
};

WarningAlert.propTypes = {
  warningCloseEventHandler: PropTypes.func.isRequired,
  warningHeader: PropTypes.string.isRequired,
  warningMessage: PropTypes.string.isRequired,
  warningVisible: PropTypes.bool.isRequired,
};

export default WarningAlert;
