import React from 'react';

const RoundedButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white px-10 py-6 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
