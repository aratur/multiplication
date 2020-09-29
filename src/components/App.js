import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
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
        <div className="col-md-6 col-sm-8" align="center" style={styleColPadding}><Navbar /></div>
        <div className="col-md-3 col-sm-2" />
      </div>
      <Gems />
      <div className="row" style={styleRowMargin}>
        <div className="col-md-3 col-sm-2" />
        <div className="col-md-6 col-sm-8" align="center" style={styleColPadding}>
          <Switch>
            <Route path="/results">
              <ResultsTable />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </div>
        <div className="col-md-3 col-sm-2" />
      </div>
    </Router>
  </Provider>
);

export default App;
