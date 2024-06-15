import React, { useState, useContext } from 'react';
import './UpperInput.css';
import PopupWindow from './PopupWindow';
import { ConfigureContext } from './Context/ConfigureContext'; // Correct import

const UpperInput = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { getPort, getBoard, getBaud } = useContext(ConfigureContext); // Correct usage

  const togglePopup = () => {
    setShowPopup(prevState => !prevState);
  };

  return (
    <div className='Upper-input-container'>
      <button onClick={togglePopup}>Configure</button>
      {showPopup && <PopupWindow onClose={togglePopup} />}
      <div>Board: {getBoard}</div>
      <div>Port: {getPort}</div>
      <div>Baud Rate: {getBaud} baud</div>
    </div>
  );
};

export default UpperInput;
