// LoadingOverlay.js

import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-75 z-50">
      <div className="spinner border-t-4 border-blue-500 border-solid rounded-full h-12 w-12"></div>
    </div>
  );
};

export default LoadingOverlay;
