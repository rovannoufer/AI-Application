import React from 'react';

export const Sheet = ({ open, onClose, children }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 ${open ? 'block' : 'hidden'}`} onClick={onClose}>
      <div className="fixed top-0 right-0 w-3/4 bg-white h-full shadow-lg p-5" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const SheetTrigger = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};
