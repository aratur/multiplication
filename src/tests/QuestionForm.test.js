import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionForm from '../QuestionForm';

const renderQuestionForm = (noOfAnswers = 5,
  range = [true, true, true, true]) => render(
    <QuestionForm
      noOfAnswers={noOfAnswers}
      range={range}
    />,
);

describe('QuestionForm', () => {
  it('should fail auto generated test', () => {
    renderQuestionForm();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });
});
