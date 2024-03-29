import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import App from './App';

const renderApp = () => {
  // initialize Google Analytics
  ReactGA.initialize('UA-179029645-1');

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
};

renderApp();

export default renderApp;
