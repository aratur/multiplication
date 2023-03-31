import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './redux-store/store';
import routes from './routes/routes';

const App = () => (
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);

export default App;
