import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import Navbar from '../components/Navbar';
import store from '../redux-store/store';

const renderNavbar = () => {
  ReactGA.initialize('foo', { testMode: true });
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>,
  );
};

beforeEach(() => {
  renderNavbar();
});

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
const getActiveElement = () => getByRoleAndClassName('listitem', 'active');

describe('Navbar', () => {
  it('should have working dropdown button', () => {
    expect(getByRoleAndClassName('listitem', 'dropdown'))
      .toHaveClass('dropdown');
    userEvent.click(getLanguageButton());
    expect(getByRoleAndClassName('listitem', 'dropdown open'))
      .toHaveClass('dropdown open');
  });

  it('should change current language', () => {
    expect(screen.getByText('Ustawienia')).toBeInTheDocument();
    userEvent.click(getLanguageButton());
    const enLink = screen.getByRole('link', { name: '- EN -' });
    userEvent.click(enLink);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    const plLink = screen.getByRole('link', { name: '- PL -' });
    userEvent.click(plLink);
    expect(screen.getByText('Ustawienia')).toBeInTheDocument();
  });
  it('should have active class on start tab', () => {
    userEvent.click(screen.getByRole('link', { name: 'start Start' }));
    expect(getActiveElement()).toHaveTextContent('Start');
  });
  it('should have active class on results tab', async () => {
    userEvent.click(screen.getByRole('link', { name: 'results Wyniki' }));
    expect(getActiveElement()).toHaveTextContent('Wyniki');
  });
  it('should have active class on settings tab', () => {
    userEvent.click(screen.getByRole('link', { name: 'settings Ustawienia' }));
    expect(getActiveElement()).toHaveTextContent('Ustawienia');
  });
});
