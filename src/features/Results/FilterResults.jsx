import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  showAll,
  showCorrect,
  showIncorrect,
} from '../../redux-store/questionSlice';
import { i18n, getTranslations } from '../../redux-store/i18nSlice';

const FilterResults = () => {
  const dispatch = useDispatch();
  const translations = useSelector(getTranslations);
  const styleButtons = { margin: '5px' };
  const styleWell = { padding: '10px' };

  return (
    <div className="well text-center" style={styleWell}>
      <b>{i18n(translations, 'results.buttonsLabel')}</b>
      <div id="table-buttons-group">
        <button
          className="btn btn-success"
          type="button"
          style={styleButtons}
          onClick={() => dispatch(showCorrect())}
        >
          {i18n(translations, 'results.buttonCorrect')}
        </button>
        <button
          className="btn btn-danger"
          type="button"
          style={styleButtons}
          onClick={() => dispatch(showIncorrect())}
        >
          {i18n(translations, 'results.buttonIncorrect')}
        </button>
        <button
          className="btn btn-warning"
          type="button"
          style={styleButtons}
          onClick={() => dispatch(showAll())}
        >
          {i18n(translations, 'results.buttonAll')}
        </button>
      </div>
    </div>
  );
};

export default FilterResults;
