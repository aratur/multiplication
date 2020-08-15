import React from 'react';

function WarningAlert(props) {
  if (props.warningVisible) {
    return (
      <div className="alert alert-dismissable alert-info" style={({marginTop:"5px", marginBottom: "5px"})}>
        <button type="button" className="close" onClick={props.warnigCloseEventHandler}>×</button>
          <h4>{props.warningHeader}</h4>
          <p>{props.warningMessage}</p>
          </div>);
  } else return null;
}

export default WarningAlert;
