import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link, NavLink,
} from 'react-router-dom';
import store from './redux-store/store';
import RangePicker from './RangePicker';
import QuestionForm from './QuestionForm';
import ResultsTable from './ResultsTable';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container-fluid" align="center">
        <div className="navbar navbar-default">
          <div className="navbar-header">
            <NavLink to="/" activeClassName="navbar-brand">10 x 10</NavLink>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">start</Link>
            </li>
            <li>
              <Link to="/results">results</Link>
            </li>
            <li>
              <Link to="/settings">settings</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <Switch>
            <Route path="/results">
              <ResultsTable />
            </Route>
            <Route path="/settings">
              <RangePicker />
            </Route>
            <Route path="/">
              <QuestionForm />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;
