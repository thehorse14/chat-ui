import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultBox from '@/components/ResultBox';
import '@testing-library/jest-dom'

describe('ResultBox Component', () => {
  const sampleFiles = [
    {
      fileName: 'sample-file-1.txt',
      topUsers: [
        { userName: 'User1', count: 5 },
        { userName: 'User2', count: 3 },
      ],
    },
    {
      fileName: 'sample-file-2.txt',
      topUsers: [
        { userName: 'User3', count: 8 },
        { userName: 'User4', count: 4 },
      ],
    },
  ];

  it('renders without errors', () => {
    render(<ResultBox files={sampleFiles} />);
  });

  it('displays file names and user counts', () => {
    render(<ResultBox files={sampleFiles} />);

    expect(screen.getByText('File Name: sample-file-1.txt')).toBeInTheDocument();
    expect(screen.getByText('File Name: sample-file-2.txt')).toBeInTheDocument();

    expect(screen.getByText('User: User1, Count: 5')).toBeInTheDocument();
    expect(screen.getByText('User: User2, Count: 3')).toBeInTheDocument();
    expect(screen.getByText('User: User3, Count: 8')).toBeInTheDocument();
    expect(screen.getByText('User: User4, Count: 4')).toBeInTheDocument();
  });
});
