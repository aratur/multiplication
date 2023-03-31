import React from 'react';
// eslint-disable-next-line object-curly-newline
import { render, act, fireEvent, screen } from '@testing-library/react';

import WarningAlert from './Alert';

describe('WarningAlert', () => {
  const renderAlert = (visible, callback = () => {}) =>
    render(
      <WarningAlert
        isVisible={visible}
        onCloseClicked={callback}
        header="Header text"
        message="Message text"
      />
    );
  test('should render correctly when visible', async () => {
    const { getByRole, getByText } = renderAlert(true);
    expect(getByText('Header text')).toBeInTheDocument();
    expect(getByText('Message text')).toBeInTheDocument();
    expect(getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('should return null when not visible', async () => {
    renderAlert(false);
    expect(
      screen.queryByRole('button', { name: /close/i })
    ).not.toBeInTheDocument();
  });

  test('should hide after 4 seconds', async () => {
    const onClose = jest.fn();
    jest.useFakeTimers();
    renderAlert(true, onClose);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(onClose).toHaveBeenCalled();
  });

  test('should hide after clicking close button', async () => {
    const onClose = jest.fn();
    const { getByRole } = renderAlert(true, onClose);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
