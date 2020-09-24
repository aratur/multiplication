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
      pl: {},
      en: {},
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
      if (Number(key) || key === '0') keys.push(key);
    }
    return { keys };
  }

  test() {
    const person = 'Artur';
    const age = 35;
    const text = this.i18n('That {0} is a {1} years old', person, age);
    console.log(text);
  }

  i18n(statement, ...values) {
    const keys = this.getKeysFromStatement(statement);

    const { currentLanguage, pl, en } = this.state;
    const dictionary = currentLanguage === 'pl' ? pl : en;
    if (dictionary === 'undefined') return null;

    console.log(keys);
    console.log(values);
    console.log(dictionary.equation.label);
    return '';
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
        this.test();
      });
  }

  addTranslation(element) {
    if (typeof element === 'object'
      && typeof element.type === 'function') {
      const { children } = element.props;
      const newChildren = React.Children
        .map(children, (child) => this.addTranslation(child));
      return React
        .cloneElement(element, { alt: 'level', children: newChildren });
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
    [PropTypes.string, PropTypes.func],
  ).isRequired,
};

export default Translations;
