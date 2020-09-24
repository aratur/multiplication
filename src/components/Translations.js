import React, { Component } from 'react';

class Translations extends Component {
  constructor(props) {
    super(props);
    const { language, children } = props;
    this.children = children;
    this.fetchTranslations('en.json');
    this.fetchTranslations('en.json');
    this.state = {
      pl: {},
      en: {},
      currentLanguage: 'pl',
      defaultLanguage: 'pl',
      i18n: this.i18n,
    };
  }

  i18n() {
    const { pl, en } = this.state;
    return this.state.pl;
  }

  fetchTranslations(fileName) {
    fetch(fileName)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          pl: result,
        });
        this.pl = result;
        return result;
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

export default Translations;
