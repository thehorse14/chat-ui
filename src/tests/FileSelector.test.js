import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileSelector from '@/components/FileSelector';
import '@testing-library/jest-dom';

describe("FileSelector Component", () => {
    it("should render the FileSelector component", () => {
      render(<FileSelector />);
      const fileSelectorElement = screen.getByText(/Drag & Drop files/);
      expect(fileSelectorElement).toBeInTheDocument();
    });
  
    it("should allow selecting and displaying files", () => {
      const onFileSelected = jest.fn();
      render(<FileSelector onFileSelected={onFileSelected} />);
      const input = screen.getByPlaceholderText('fileInput');
      const file = new File(['file contents'], 'test.txt', { type: 'text/plain' });
  
      fireEvent.change(input, { target: { files: [file] } });
  
      expect(onFileSelected).toHaveBeenCalledWith([file]);
      const fileNameElement = screen.getByText('test.txt');
      expect(fileNameElement).toBeInTheDocument();
    });
  
    it("should allow removing files", () => {
      const onFileSelected = jest.fn();
      const onFileRemoved = jest.fn();
      render(<FileSelector onFileSelected={onFileSelected} onFileRemoved={onFileRemoved} />);
      const input = screen.getByPlaceholderText('fileInput');
      const file = new File(['file contents'], 'test.txt', { type: 'text/plain' });
  
      fireEvent.change(input, { target: { files: [file] } });
      const removeButton = screen.getByText('x');
      fireEvent.click(removeButton);
  
      expect(onFileSelected).toHaveBeenCalledWith([file]);
      expect(onFileRemoved).toHaveBeenCalledWith([]);
    });
  
    it("should allow drag and drop files", () => {
        const onFileDropped = jest.fn();
        render(<FileSelector onFileDropped={onFileDropped} />);
        const dropArea = screen.getByText(/Drag & Drop files/);
    
        const file = new File(['file contents'], 'test.txt', { type: 'text/plain' });
        const dataTransfer = {
          dataTransfer: {
            files: [file],
          },
        };
    
        fireEvent.dragEnter(dropArea, dataTransfer);
        fireEvent.dragOver(dropArea, dataTransfer);
        fireEvent.drop(dropArea, { ...dataTransfer });
    
        expect(onFileDropped).toHaveBeenCalledWith([file]);
      });
  
    it("should open file explorer when 'Select files' is clicked", () => {
      render(<FileSelector />);
      const selectFilesButton = screen.getByText('Select files');
  
      const input = screen.getByPlaceholderText('fileInput');
      const clickSpy = jest.spyOn(input, 'click');
  
      fireEvent.click(selectFilesButton);
  
      expect(clickSpy).toHaveBeenCalled();
    });

});