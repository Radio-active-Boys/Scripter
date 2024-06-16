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
      <button className="upper-button config-button" onClick={togglePopup} data-hover="Open Configuration">
        Configure
      </button>
      {showPopup && <PopupWindow onClose={togglePopup} />}
      <button className="upper-button board-button" data-hover="Board Info">
        {getBoard}
      </button>
      <button className="upper-button port-button" data-hover="Port Info">
        {getPort}
      </button>
      <button className="upper-button baud-button" data-hover="Baud Rate">
        {getBaud} baud
      </button>
    </div>
  );
};

export default UpperInput;
