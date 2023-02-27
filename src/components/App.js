import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from '../redux-store/store';
import LandingPage from './LandingPage';
import Navbar from './Navbar';
import Gems from './Gems';
import Loader from './Loader';

const styleRowMargin = { marginLeft: 0, marginRight: 0 };
const styleColPadding = { paddingLeft: '5px', paddingRight: '5px' };

const ResultsTableLazy = lazy(() => import('./ResultsTable'));
const SettingsLazy = lazy(() => import('./Settings'));

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="row" style={styleRowMargin}>
        <div className="col-md-3 col-sm-2" />
        <div className="col-md-6 col-sm-8" style={styleColPadding}>
          <Navbar />
        </div>
        <div className="col-md-3 col-sm-2" />
      </div>
      <Gems />
      <div className="row" style={styleRowMargin}>
        <div className="col-md-3 col-sm-2" />
        <div className="col-md-6 col-sm-8 text-center" style={styleColPadding}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/results" element={<ResultsTableLazy />} />
              <Route path="/settings" element={<SettingsLazy />} />
            </Routes>
          </Suspense>
        </div>
        <div className="col-md-3 col-sm-2" />
      </div>
    </Router>
  </Provider>
);

export default App;
