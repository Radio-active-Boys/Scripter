// UpperInput.jsx

import React, { useState } from 'react';
import './UpperInput.css';
import PopupWindow from './PopupWindow';

const UpperInput = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(prevState => !prevState);
  };

  return (
    <div className='Upper-input-container'>
      <button onClick={togglePopup}>COM Port</button>
      {showPopup && <PopupWindow onClose={togglePopup} />}
    </div>
  );
};

export default UpperInput;



