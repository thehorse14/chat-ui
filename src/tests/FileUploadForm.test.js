import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUploadForm from '@/components/FileUploadForm';
import '@testing-library/jest-dom'

jest.mock('../lib/api', () => ({
  uploadFile: async (formData) => {
    return Promise.resolve({ data: { results: [] } });
  },
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('FileUploadForm Component', () => {
  it('renders without errors', () => {
    render(<FileUploadForm />);
  });

  it('disables the "Upload" button when no files are selected', () => {
    const { getByText } = render(<FileUploadForm />);
    const uploadButton = getByText('Upload');
    expect(uploadButton).toBeDisabled();
  });

  it('enables the "Upload" button when files are selected', () => {
    const { getByText, getByPlaceholderText } = render(<FileUploadForm />);
    const input = getByPlaceholderText('fileInput');
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });

    const uploadButton = getByText('Upload');
    expect(uploadButton).not.toBeDisabled();
  });

  it('enables the "Upload" button when files are selected', () => {
    const { getByText, getByPlaceholderText } = render(<FileUploadForm />);
    const input = getByPlaceholderText('fileInput');
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });

    const uploadButton = getByText('Upload');
    expect(uploadButton).not.toBeDisabled();
  });

});
