import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import store from '../redux-store/store';

const renderNavbar = () => render(
  <Provider store={store}>
    <StaticRouter>
      <Navbar />
    </StaticRouter>
  </Provider>,
);

const getLanguageButton = () => screen.getByRole('img', { name: 'language' });
const getByRoleAndClassName = (role, className) => {
  const listElements = screen.getAllByRole(role);
  let result;
  listElements.forEach((item) => {
    if (item.className === className) {
      result = item;
    }
  });
  return result;
};
describe('Navbar', () => {
  it('should have working dropdown button', () => {
    renderNavbar();
    expect(getByRoleAndClassName('listitem', 'dropdown'))
      .toHaveClass('dropdown');
    userEvent.click(getLanguageButton());
    expect(getByRoleAndClassName('listitem', 'dropdown open'))
      .toHaveClass('dropdown open');
  });

  it('should change current language', () => {
    renderNavbar();
    expect(screen.getByText('Ustawienia')).toBeInTheDocument();
    userEvent.click(getLanguageButton());
    const enLink = screen.getByRole('link', { name: '- EN -' });
    userEvent.click(enLink);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    const plLink = screen.getByRole('link', { name: '- PL -' });
    userEvent.click(plLink);
    expect(screen.getByText('Ustawienia')).toBeInTheDocument();
  });
});
