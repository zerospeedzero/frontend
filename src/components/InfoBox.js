// InfoBox.js

import React from 'react';

const InfoBox = ({ type, message }) => {
  const boxClasses = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  return (
    <div className={`border p-4 mb-4 rounded ${boxClasses[type]}`}>
      {message}
    </div>
  );
};

export default InfoBox;
