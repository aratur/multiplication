import React from 'react';
import { Link } from 'react-router-dom';
import gear from './img/gear.svg';
import table from './img/table.svg';
import house from './img/house.svg';

const Navbar = () => (

  <ul className="nav nav-tabs" style={{ marginBottom: '15px' }}>
    <li>
      <Link to="/">
        <h4>
          <img src={house} alt="Start" width="25" />
          {' '}
          Start
        </h4>
      </Link>
    </li>
    <li>
      <Link to="/results">
        <h4>
          <img src={table} alt="results" width="25px" />
          {' '}
          Results
        </h4>
      </Link>
    </li>
    <li>
      <Link to="/settings">
        <h4>
          <img src={gear} alt="Start" width="25px" />
          {' '}
          Settings
        </h4>
      </Link>
    </li>
  </ul>

);

export default Navbar;
