import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Router from './router/Router';
import Route from "./router/Route";


export const renderApp = (state) => {
  ReactDOM.render(
    <Router {...state}>
      <Route path="" component={App}>
        <Route path="/" component={App} />
      </Route>
    </Router>,
    document.getElementById('root')
  );
};

let state = {
  location: window.location.pathname,
};

renderApp(state);
