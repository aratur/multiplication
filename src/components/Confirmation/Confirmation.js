import React from 'react';
import PropTypes from 'prop-types';

const ModalYesOrNo = (props) => {
  const {
    handleModalClicked,
    headerText,
    bodyText,
    isModalVisible,
    yesButtonText,
    noButtonText,
  } = props;

  return (
    <div
      id="previewModal"
      className={isModalVisible ? 'modal in' : 'modal'}
      style={isModalVisible ? { display: 'block' } : { display: 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={handleModalClicked}
              data-dismiss="modal"
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
              data-dismiss="modal"
              onClick={handleModalClicked}
              value="yes"
              data-testid="yes"
            >
              {yesButtonText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModalClicked}
              value="no"
            >
              {noButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalYesOrNo.propTypes = {
  handleModalClicked: PropTypes.func.isRequired,
  bodyText: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  yesButtonText: PropTypes.string.isRequired,
  noButtonText: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};

export default ModalYesOrNo;
