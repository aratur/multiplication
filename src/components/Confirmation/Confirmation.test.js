import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import Confirmation from './Confirmation';

describe('Confirmation', () => {
  const handleConfirmed = jest.fn();
  const handleRejected = jest.fn();
  const headerText = 'Are you sure?';
  const bodyText = 'This action cannot be undone.';
  const yesButtonText = 'Yes';
  const noButtonText = 'No';
  const isModalVisible = true;
  beforeEach(() => {
    handleConfirmed.mockClear();
    handleRejected.mockClear();
  });

  it('renders the confirmation modal with the correct props', () => {
    render(
      <Confirmation
        handleConfirmed={handleConfirmed}
        handleRejected={handleRejected}
        headerText={headerText}
        bodyText={bodyText}
        yesButtonText={yesButtonText}
        noButtonText={noButtonText}
        isModalVisible={isModalVisible}
      />
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('modal show');

    const title = screen.getByText(headerText);
    expect(title).toBeInTheDocument();

    const body = screen.getByText(bodyText);
    expect(body).toBeInTheDocument();

    const yesButton = screen.getByRole('button', { name: 'Yes' });
    expect(yesButton).toHaveValue('yes');
    expect(yesButton).toHaveTextContent(yesButtonText);

    const noButton = screen.getByRole('button', { name: 'No' });
    expect(noButton).toHaveTextContent(noButtonText);
  });

  it('calls handleConfirmed when "Yes" button is clicked', () => {
    render(
      <Confirmation
        handleConfirmed={handleConfirmed}
        handleRejected={handleRejected}
        headerText={headerText}
        bodyText={bodyText}
        yesButtonText={yesButtonText}
        noButtonText={noButtonText}
        isModalVisible={isModalVisible}
      />
    );

    const yesButton = screen.getByTestId('yes');
    fireEvent.click(yesButton);
    expect(handleConfirmed).toHaveBeenCalledTimes(1);
  });

  it('calls handleRejected when "No" button is clicked', () => {
    render(
      <Confirmation
        handleConfirmed={handleConfirmed}
        handleRejected={handleRejected}
        headerText={headerText}
        bodyText={bodyText}
        yesButtonText={yesButtonText}
        noButtonText={noButtonText}
        isModalVisible={isModalVisible}
      />
    );

    const noButton = screen.getByRole('button', { name: 'No' });
    fireEvent.click(noButton);
    expect(handleRejected).toHaveBeenCalledTimes(1);
  });
});
