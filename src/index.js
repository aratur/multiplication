import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux-store/store';
// import Router from './router/Router';
// import Route from "./router/Route";

const renderApp = () => {
  ReactDOM.render(
    // <Router {...state}>
    //  <Route path="" component={App}>
    <Provider store={store}>
      <App />
    </Provider>,
    //  </Route>
    // </Router>,
    document.getElementById('root'),
  );
};

renderApp();

export default renderApp;
