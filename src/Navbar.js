import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (

  <ul className="nav nav-tabs" style={{ marginBottom: '15px' }}>
    <li>
      <Link to="/"><h4>Start</h4></Link>
    </li>
    <li>
      <Link to="/results"><h4>Results</h4></Link>
    </li>
    <li>
      <Link to="/settings"><h4>Settings</h4></Link>
    </li>
  </ul>

);

export default Navbar;
