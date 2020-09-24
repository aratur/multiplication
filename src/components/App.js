import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import store from '../redux-store/store';
import Settings from './Settings';
import QuestionForm from './QuestionForm';
import ResultsTable from './ResultsTable';
import Navbar from './Navbar';
import Translations from './Translations';

const styleRowMargin = { marginLeft: 0, marginRight: 0 };
const styleColPadding = { paddingLeft: '5px', paddingRight: '5px' };

const App = () => (
  <Provider store={store}>
    <Translations language="pl">
      <Router>
        <div className="row" style={styleRowMargin}>
          <div className="col-sm-3" />
          <div className="col-sm-6" align="center" style={styleColPadding}><Navbar /></div>
          <div className="col-sm-3" />
        </div>
        <div className="row" style={styleRowMargin}>
          <div className="col-sm-3" />
          <div className="col-sm-6" align="center" style={styleColPadding}>
            <Switch>
              <Route path="/results">
                <ResultsTable />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/">
                <QuestionForm />
              </Route>
            </Switch>
          </div>
          <div className="col-sm-3" />
        </div>
      </Router>
    </Translations>
  </Provider>
);

export default App;
