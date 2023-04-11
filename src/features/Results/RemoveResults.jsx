import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n, getTranslations } from '../../redux-store/i18nSlice';
import { reset } from '../../redux-store/questionSlice';
import ConfirmationModal from '../../components/Confirmation/Confirmation';

const RemoveResults = () => {
  const dispatch = useDispatch();
  const translations = useSelector(getTranslations);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleConfirmed = () => {
    dispatch(reset());
    setIsModalVisible(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-xs"
        onClick={() => setIsModalVisible(true)}
      >
        {i18n(translations, 'results.buttonRemoveHistory')}
      </button>
      <ConfirmationModal
        handleRejected={() => setIsModalVisible(false)}
        handleConfirmed={handleConfirmed}
        bodyText={i18n(translations, 'results.removeHistory.bodyText')}
        headerText={i18n(translations, 'results.removeHistory.headerText')}
        yesButtonText={i18n(
          translations,
          'results.removeHistory.yesButtonText'
        )}
        noButtonText={i18n(translations, 'results.removeHistory.noButtonText')}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default RemoveResults;
