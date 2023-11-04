import React from 'react';

const ResultBox = ({ files }) => {
  return (
    <div>
      <h2 className='mb-3'>Results:</h2>
      {files.map((file, index) => (
        <div key={index} className="border border-blue-300 p-4 mb-4 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-500 mb-2">File Name: {file.fileName}</h3>
          <ul className="list-disc list-inside">
            {file.topUsers.map((user, userIndex) => (
              <li key={userIndex}>
                User: {user.userName}, Count: {user.count}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResultBox;
