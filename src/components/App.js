import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from '../redux-store/store';
import Settings from './Settings';
import LandingPage from './LandingPage';
import ResultsTable from './ResultsTable';
import Navbar from './Navbar';
import Gems from './Gems';

const styleRowMargin = { marginLeft: 0, marginRight: 0 };
const styleColPadding = { paddingLeft: '5px', paddingRight: '5px' };

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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/results" element={<ResultsTable />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <div className="col-md-3 col-sm-2" />
      </div>
    </Router>
  </Provider>
);

export default App;
