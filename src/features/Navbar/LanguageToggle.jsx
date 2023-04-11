import React from 'react';
import PropTypes from 'prop-types';
import flag from '../../assets/navbar/flag.svg';

const LanguageToggle = (props) => {
  const { handleLanguageSelection, isButtonOpen, handleButtonOpen } = props;

  return (
    <li className={isButtonOpen ? 'dropdown open' : 'dropdown'}>
      <a
        className="dropdown-toggle"
        data-toggle="dropdown"
        href="#dropdown"
        onClick={handleButtonOpen}
        style={{ padding: '10px' }}
      >
        <h4 style={{ margin: '4px' }}>
          <img src={flag} alt="language" width="25" />
          <span className="caret" />
        </h4>
      </a>
      <ul className="dropdown-menu">
        <li>
          <a href="#PL" data-toggle="tab" onClick={handleLanguageSelection}>
            - PL -
          </a>
        </li>
        <li>
          <a href="#EN" data-toggle="tab" onClick={handleLanguageSelection}>
            - EN -
          </a>
        </li>
      </ul>
    </li>
  );
};

LanguageToggle.propTypes = {
  handleLanguageSelection: PropTypes.func.isRequired,
  isButtonOpen: PropTypes.bool.isRequired,
  handleButtonOpen: PropTypes.func.isRequired,
};

export default LanguageToggle;
