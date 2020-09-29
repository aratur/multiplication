import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import gear from '../img/gear.svg';
import table from '../img/table.svg';
import house from '../img/house.svg';
import flag from '../img/flag.svg';
import {
  i18n, getTranslations,
  setCurrentLanguage,
} from '../redux-store/i18nSlice';
import './NavBar.css';

const Navbar = () => {
  const translations = useSelector(getTranslations);
  const location = useLocation();
  const dispatch = useDispatch();
  const styleAPadding = { padding: '5px' };
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  useEffect(() => {
    ReactGA.ga('send', 'pageview', location.pathname);
  }, [location.pathname]);
  const handleButtonOpen = (event) => {
    event.preventDefault();
    setIsButtonOpen(!isButtonOpen);
  };
  const handleLanguageSelection = (event) => {
    event.preventDefault();
    setIsButtonOpen(false);
    const language = event.target.textContent === '- PL -' ? 'pl' : 'en';
    dispatch(setCurrentLanguage({ language }));
  };
  return (
    <ul className="nav nav-tabs" style={{ marginBottom: '15px' }}>
      <li className={(location.pathname === '/') ? 'active' : undefined}>
        <NavLink to="/" style={styleAPadding}>
          <h4>
            <img src={house} alt="start" width="25" />
            {' '}
            {i18n(translations, 'navbar.start')}
          </h4>
        </NavLink>
      </li>
      <li className={(location.pathname === '/results') ? 'active' : undefined}>
        <NavLink to="/results" style={styleAPadding}>
          <h4>
            <img src={table} alt="results" width="25" />
            {' '}
            {i18n(translations, 'navbar.results')}
          </h4>
        </NavLink>
      </li>
      <li className={(location.pathname === '/settings') ? 'active' : undefined}>
        <NavLink to="/settings" style={styleAPadding}>
          <h4>
            <img src={gear} alt="settings" width="25" />
            {' '}
            {i18n(translations, 'navbar.settings')}
          </h4>
        </NavLink>
      </li>
      <li className={isButtonOpen ? 'dropdown open' : 'dropdown'}>
        <a
          className="dropdown-toggle"
          data-toggle="dropdown"
          href="#dropdown"
          onClick={handleButtonOpen}
          style={styleAPadding}
        >
          <h4>
            <img src={flag} alt="language" width="25" />
            <span className="caret" />
          </h4>
        </a>
        <ul className="dropdown-menu">
          <li>
            <a
              href="#PL"
              data-toggle="tab"
              onClick={handleLanguageSelection}
            >
              - PL -
            </a>
          </li>
          <li>
            <a
              href="#EN"
              data-toggle="tab"
              onClick={handleLanguageSelection}
            >
              - EN -
            </a>
          </li>
        </ul>
      </li>
    </ul>

  );
};

export default Navbar;
