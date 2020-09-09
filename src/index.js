import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Router from './router/Router';
// import Route from "./router/Route";

const renderApp = () => {
  ReactDOM.render(
    // <Router {...state}>
    //  <Route path="" component={App}>
    <App />,
    //  </Route>
    // </Router>,
    document.getElementById('root'),
  );
};

renderApp();

export default renderApp;
