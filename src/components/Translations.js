/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Translations extends Component {
  constructor(props) {
    super(props);
    const { language, children } = props;
    this.children = children;
    this.fetchTranslations('pl');
    this.fetchTranslations('en');
    this.state = {
      pl: undefined,
      en: undefined,
      currentLanguage: language,
    };
    this.i18n = this.i18n.bind(this);
  }

  getKeysFromStatement(statement) {
    if (statement.indexOf('{') === -1) return undefined;
    const keys = [];
    let start = 0;
    let end = 0;
    while (statement.indexOf('{', start) > -1) {
      start = statement.indexOf('{', start) + 1;
      end = statement.indexOf('}', start);
      const key = statement.substring(start, end);
      console.log(key);
      if (Number(key) || key === '0') keys.push(Number(key));
    }
    return keys;
  }

  i18n(statement, ...parameters) {
    const keys = this.getKeysFromStatement(statement);
    const values = [...parameters];

    const { currentLanguage, pl, en } = this.state;
    const dictionary = currentLanguage === 'pl' ? pl : en;
    if (typeof dictionary === 'undefined') {
      console.warn('Could not translate the entry because of empty dictionary ', currentLanguage);
      return null;
    }

    let resultString = statement.indexOf('.') === -1 ? statement
      : statement.split('.')
        .reduce((result, step) => result[step], dictionary);
    if (typeof resultString === 'undefined') {
      console
        .warn(`Could not retrieve an entry on path "${statement}" in dictionary "${currentLanguage}"`);
    }

    if (typeof keys === 'undefined') return resultString;
    keys.forEach((key) => {
      if (values !== 'undefined' && values.length <= key) {
        resultString = resultString.replace(`{${key}}`, values[key]);
      }
    });

    return resultString;
  }

  fetchTranslations(language) {
    fetch(`${language}.json`)
      .then((response) => response.json())
      .then((result) => {
        const languageTranslations = {};
        languageTranslations[language] = result;
        this.setState(
          languageTranslations,
        );
      });
  }

  addTranslation(element) {
    if (typeof element === 'object'
      && typeof element.type === 'function') {
      const { children } = element.props;
      const newChildren = React.Children
        .map(children, (child) => this.addTranslation(child));
      return React
        .cloneElement(element, { i18n: this.i18n, children: newChildren });
    }
    return element;
  }

  render() {
    return React.Children
      .map(this.children, (child) => this.addTranslation(child));
  }
}

Translations.propTypes = {
  language: PropTypes.oneOf(['pl', 'en']).isRequired,
  children: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.func, PropTypes.object],
  ).isRequired,
};

export default Translations;
