"use client";
import React, { useState } from "react";
import FileSelector from "./FileSelector";
import ResultBox from "./ResultBox";
import LoadingOverlay from "./LoadingOverlay";
import { uploadFile } from '../lib/api';
import { toast } from 'react-toastify';

const FileUploadForm = () => {
  const [files, setFiles] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelected = (files) => {
    setFiles(files);
  };

  const handleFileRemoved = (files) => {
    setFiles(files);
  };

  const handleFileDropped = (files) => {
    setFiles((prevState) => [...prevState, ...files]);
  };

  const resetFile = () => {
    setFiles([]);
    setRefresh(!refresh);
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      setIsLoading(true);
      const response = await uploadFile(formData);
        setResponseData(response.data.results);
        toast.success("Upload completed")
        resetFile();
    } catch (error) {
        toast.error(error.response.data.error);
    } finally {
        setIsLoading(false); // Stop loading whether API call succeeds or fails
    }
  };

  const getButtonStyle = () => {
    if (files.length === 0) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    } else {
      return 'bg-black text-white hover:bg-gray-300';
    }
  };

  return (
    <div className="flex w-full">
      {isLoading && <LoadingOverlay />}
      <div className="w-1/2 p-4 pr-8">
        <form>
          <h2 className="text-lg font-semibold mb-2">Upload a log file (.txt)</h2>
          <FileSelector
            accept=".txt"
            onFileSelected={handleFileSelected}
            onFileRemoved={handleFileRemoved}
            onFileDropped={handleFileDropped}
            refresh={refresh}
          />
          <button
            type="button"
            onClick={handleUpload}
            className={`px-4 py-2 mt-4 rounded-br-none border-none ${getButtonStyle()}`}
            disabled={files.length === 0}
          >
            Upload
          </button>
        </form>
      </div>
      <div className="w-1/2 p-4 pl-8">
        <ResultBox files={responseData} />
      </div>
    </div>
  );
};

export default FileUploadForm;
