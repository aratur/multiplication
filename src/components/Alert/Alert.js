import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  const { header, message } = props;
  const { isVisible, onCloseClicked } = props;

  useEffect(() => {
    let cleanup;
    if (isVisible) {
      cleanup = setTimeout(() => {
        onCloseClicked();
      }, 4000);
    }
    return () => {
      if (cleanup) {
        clearTimeout(cleanup);
      }
    };
  }, [isVisible, onCloseClicked]);

  return isVisible ? (
    <div className="alert alert-dismissable alert-info">
      <button
        type="button"
        aria-label="close alert"
        className="close"
        onClick={onCloseClicked}
      >
        x
      </button>
      <h4>{header}</h4>
      <p>{message}</p>
    </div>
  ) : null;
};

Alert.propTypes = {
  onCloseClicked: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Alert;
