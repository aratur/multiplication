import React from 'react';
import {render, cleanup, screen, act, fireEvent} from '@testing-library/react';
import WarningAlert from '../WarningAlert';

afterEach(cleanup);

const renderAlert = (visible, callback = () => {}) => {
  return render(
    <WarningAlert
      warningVisible={visible}
      warningCloseEventHandler={callback}
      warningHeader= "Header text"
      warningMessage="Message text"
      />)
}

describe('WarningAlert', () => {
  test('should render correctly when visible', async () => {
      const {getByRole, getByText} = renderAlert(true);
      expect(getByText('Header text'));
      expect(getByText('Message text'));
      expect(getByRole('button', {name:/close/i}));
  });

  test('should return null when not visible', async () => {
      const { container } =  renderAlert(false);
      expect(container.firstChild).toBeNull();
  });

  test('should hide after 4 seconds', async () => {
      const onClose = jest.fn();
      jest.useFakeTimers();
      const {getByText} = renderAlert(true, onClose);
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
      const {getByRole} = renderAlert(true, onClose);
      expect(onClose).not.toHaveBeenCalled();
      fireEvent.click(getByRole('button', {name:/close/i}));
      expect(onClose).toHaveBeenCalled();
  });
});
