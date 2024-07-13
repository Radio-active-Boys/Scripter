import React, { useRef } from 'react';
import "./Button.css"

export const ImportButton = ({ onFileSelect, children }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <button className='my-button import-button' onClick={() => fileInputRef.current.click()}>
        <span className='button-icon' />
        {children}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </>
  );
};

export const UploadButton = ({ onClick, children }) => {
  return (
    <button className='my-button upload-button' onClick={onClick}>
      <span className='button-icon' />
      {children}
    </button>
  );
};

export const ComplileButton = ({ onClick, children }) => {
  return (
    <button className='my-button complie-button' onClick={onClick}>
      <span className='button-icon' />
      {children}
    </button>
  );
};

export const StopButton = ({ onClick, children }) => {
  return (
    <button className='my-button stop-button' onClick={onClick}>
      <span className='button-icon' />
      {children}
    </button>
  );
};

export const DebugButton = ({ onClick, children }) => {
  return (
    <button className='my-button debug-button' onClick={onClick}>
      <span className='button-icon' />
      {children}
    </button>
  );
};
