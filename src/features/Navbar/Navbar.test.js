import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import ReactGA from 'react-ga';
import Navbar from './Navbar';
import store, { persistor } from '../../redux-store/store';

const renderNavbar = () => {
  ReactGA.initialize('foo', { testMode: true });
  return render(
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

const getLanguageButton = () => screen.getByRole('img', { name: 'language' });

describe('Navbar', () => {
  it('should change current language', async () => {
    renderNavbar();
    expect(screen.getByText('Results')).toBeInTheDocument();
    userEvent.click(getLanguageButton());
    const enLink = screen.getByRole('link', { name: '- EN -' });
    const plLink = screen.getByRole('link', { name: '- PL -' });
    fireEvent.click(plLink);
    const settingsPL = screen.getByText('Wyniki');
    expect(settingsPL).toBeInTheDocument();
    userEvent.click(enLink);
    const settingsEN = await screen.findByText('Results');
    expect(settingsEN).toBeInTheDocument();
  });
});
