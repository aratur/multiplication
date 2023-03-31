import React from 'react';
import PropTypes from 'prop-types';

const Confirmation = (props) => {
  const {
    handleConfirmed,
    handleRejected,
    headerText,
    bodyText,
    isModalVisible,
    yesButtonText,
    noButtonText,
  } = props;

  return (
    <section
      id="previewModal"
      role="dialog"
      className={['modal', isModalVisible && 'show'].join(' ')}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={handleRejected}
              aria-hidden="true"
              value="close"
            >
              X
            </button>
            <h4 className="modal-title">{headerText}</h4>
          </div>
          <div className="modal-body">
            <p>{bodyText}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              onClick={handleConfirmed}
              value="yes"
              data-testid="yes"
            >
              {yesButtonText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRejected}
              value="no"
            >
              {noButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Confirmation.propTypes = {
  handleConfirmed: PropTypes.func.isRequired,
  handleRejected: PropTypes.func.isRequired,
  bodyText: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  yesButtonText: PropTypes.string.isRequired,
  noButtonText: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};

export default Confirmation;
