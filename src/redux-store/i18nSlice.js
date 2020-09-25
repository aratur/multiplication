/* eslint "no-param-reassign": 0 */
import { createSlice } from '@reduxjs/toolkit';
import pl from './translations/pl.json';
import en from './translations/en.json';

const defaultLanguage = 'pl';
const supportedLanguages = ['pl', 'en'];

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: {
    pl,
    en,
    currentLanguage: defaultLanguage,
  },
  reducers: {
    setCurrentLanguage: (state, action) => {
      if (action.payload.language
      && supportedLanguages.indexOf(action.payload.language) > -1
      && state.currentLanguage !== action.payload.language) {
        state.currentLanguage = action.payload.language;
      }
    },
  },
});

function getKeysFromStatement(dictionaryEntry) {
  if (dictionaryEntry.indexOf('{') === -1) return undefined;
  const keys = [];
  let start = 0;
  let end = 0;
  while (dictionaryEntry.indexOf('{', start) > -1) {
    start = dictionaryEntry.indexOf('{', start) + 1;
    end = dictionaryEntry.indexOf('}', start);
    const key = end > start ? dictionaryEntry.substring(start, end) : 'undefined';
    if (Number(key) || key === '0') keys.push(Number(key));
  }
  return keys;
}

export function i18n(translations, statement, ...parameters) {
  const values = [...parameters];

  if (typeof translations === 'undefined') {
    console.warn('Could not translate the entry because of empty translations\' dictionary ');
    return null;
  }

  let dictionaryEntry = statement.indexOf('.') === -1 ? translations[statement]
    : statement.split('.')
      .reduce((result, step) => result[step], translations);
  if (typeof dictionaryEntry === 'undefined') {
    console
      .warn(`Could not retrieve an entry on path "${statement}" in dictionary`);
    return null;
  }

  const keys = getKeysFromStatement(dictionaryEntry);
  if (typeof keys === 'undefined') return dictionaryEntry;
  keys.forEach((key) => {
    if (typeof values !== 'undefined' && typeof values[key] !== 'undefined') {
      dictionaryEntry = dictionaryEntry.replace(`{${key}}`, values[key]);
    }
  });

  return dictionaryEntry;
}

// selectors
export const getTranslations = (state) => (
  state.i18n.currentLanguage === 'pl'
    ? state.i18n.pl : state.i18n.en
);
// actions
export const { setCurrentLanguage } = i18nSlice.actions;
// reducer
export default i18nSlice.reducer;
