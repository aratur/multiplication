import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './components/App';

const renderApp = () => {
  ReactGA.initialize('UA-179029645-1');
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
};

renderApp();

export default renderApp;
