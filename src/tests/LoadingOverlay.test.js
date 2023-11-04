import React from 'react';
import { render } from '@testing-library/react';
import LoadingOverlay from '@/components/LoadingOverlay';
import '@testing-library/jest-dom'

describe('LoadingOverlay Component', () => {
  it('renders without errors', () => {
    render(<LoadingOverlay />);
  });

  it('displays the loading spinner', () => {
    const { container } = render(<LoadingOverlay />);
    const spinner = container.querySelector('.spinner');

    expect(spinner).toBeInTheDocument();
  });
});
