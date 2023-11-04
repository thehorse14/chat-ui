"use client";
import React, { useEffect, useRef, useState } from "react";

const FileSelector = ({ accept, onFileSelected, onFileRemoved, onFileDropped, refresh }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles([]);
  }, [refresh]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      onFileSelected(selectedFiles);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    let filesToAdd = [];

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        filesToAdd.push(e.dataTransfer.files[i]);
      }
      setFiles((prevState) => [...prevState, ...filesToAdd]);
      onFileDropped(filesToAdd);
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const removeFile = (idx) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles(newArr);
    onFileRemoved(newArr);
  }

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div>
      <div
        className={`${
          dragActive
            ? "bg-gray-200 border-dotted border-black"
            : "bg-white border"
        } p-4 min-h-[15rem] text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept={accept}
        />

        <p>
          Drag & Drop files or{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{" "}
          to upload
        </p>

        <div className="flex flex-col items-center p-3">
          {files.map((file, idx) => (
            <div key={idx} className="flex flex-row space-x-5">
              <span>{file.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => removeFile(idx)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileSelector;
