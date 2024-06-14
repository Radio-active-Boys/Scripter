// PopupWindow.jsx

import React from 'react';
import './PopupWindow.css';
import ComPortSelector from './COMport/ComPortSelector';

const PopupWindow = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="content">
          <h2>Select Other Board and Port</h2>
          <p>Select both a Board and a Port if you want to upload a sketch.</p>
          <p>If you only select a Board you will be able to compile, but not to upload your sketch.</p>
        </div>
        <div className="Port-Board">
          <ComPortSelector onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;



