import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import Navbar from './Navbar';
import store from '../../redux-store/store';

const renderNavbar = () => {
  ReactGA.initialize('foo', { testMode: true });
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
};

const getLanguageButton = () => screen.getByRole('img', { name: 'language' });

describe('Navbar', () => {
  it('should change current language', async () => {
    renderNavbar();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    userEvent.click(getLanguageButton());
    const enLink = screen.getByRole('link', { name: '- EN -' });
    const plLink = screen.getByRole('link', { name: '- PL -' });
    userEvent.click(plLink);
    const settingsPL = await screen.findByText('Ustawienia');
    expect(settingsPL).toBeInTheDocument();
    userEvent.click(enLink);
    const settingsEN = await screen.findByText('Settings');
    expect(settingsEN).toBeInTheDocument();
  });
});
