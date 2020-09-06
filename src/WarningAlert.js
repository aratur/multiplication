import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const WarningAlert = (props) => {
  const warningStyle = {
    marginTop:"5px",
    marginBottom: "5px"
  };

  const [visible, setVisible] = useState(props.warningVisible);
  const [cleanup, setCleanup] = useState(undefined);

  useEffect(() => {
    if (visible !== props.warningVisible) {
      setVisible(props.warningVisible);
    }

    if (visible === true && typeof cleanup === "undefined"){
      setCleanup(setTimeout(() => {
        props.warningCloseEventHandler()
        }, 4000)
      )
    }
    return () => {
      if(typeof cleanup !== "undefined" ){
        clearTimeout(cleanup);
        setCleanup(undefined);
      }
    }
  }, [visible, props, cleanup]);

  if (visible) {
    return (
      <div
        className="alert alert-dismissable alert-info"
        style={warningStyle}
      >
        <button
          type="button"
          aria-label="close alert"
          className="close"
          onClick={props.warningCloseEventHandler}
        >x</button>
        <h4>{props.warningHeader}</h4>
        <p>{props.warningMessage}</p>
      </div>);
  } else return null;
};

WarningAlert.propTypes = {
  warningCloseEventHandler: PropTypes.func.isRequired,
  warningHeader: PropTypes.string.isRequired,
  warningMessage: PropTypes.string.isRequired
};

export default WarningAlert;
