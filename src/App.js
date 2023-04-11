import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux-store/store';
import routes from './routes/routes';
import Loader from './components/Loader/Loader';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);

export default App;
