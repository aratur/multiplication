import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import table from '../../assets/navbar/table.svg';
import house from '../../assets/navbar/house.svg';
import LanguageToggle from './LanguageToggle';
import {
  i18n,
  getTranslations,
  setCurrentLanguage,
} from '../../redux-store/i18nSlice';
import './NavBar.css';

const Navbar = () => {
  const translations = useSelector(getTranslations);
  const location = useLocation();
  const dispatch = useDispatch();
  const styleAPadding = { padding: '4px' };
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  useEffect(() => {
    ReactGA.ga('send', 'pageview', location.pathname);
  }, [location.pathname]);
  const handleButtonOpen = (event) => {
    setIsButtonOpen(!isButtonOpen);
  };

  const handleLanguageSelection = (event) => {
    setIsButtonOpen(false);
    const language = event.target.textContent === '- PL -' ? 'pl' : 'en';
    dispatch(setCurrentLanguage({ language }));
  };

  return (
    <ul className="nav nav-tabs" style={{ marginBottom: '15px' }}>
      <li className={location.pathname === '/' ? 'active' : undefined}>
        <NavLink to="/" style={styleAPadding}>
          <h4>
            <img src={house} alt="start" width="25" />{' '}
            {i18n(translations, 'navbar.start')}
          </h4>
        </NavLink>
      </li>
      <li className={location.pathname === '/results' ? 'active' : undefined}>
        <NavLink to="/results" style={styleAPadding}>
          <h4>
            <img src={table} alt="results" width="25" />{' '}
            {i18n(translations, 'navbar.results')}
          </h4>
        </NavLink>
      </li>
      <LanguageToggle
        handleButtonOpen={handleButtonOpen}
        isButtonOpen={isButtonOpen}
        handleLanguageSelection={handleLanguageSelection}
      />
    </ul>
  );
};

export default Navbar;
