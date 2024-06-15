import React, { useState, useContext, useEffect } from 'react';

import './BaudSelector.css';

const BaudSelector = ({ onClose }) => {

  const [selectedBaud, setSelectedBaud] = useState('9600');

  const baudList  = [
            300,
            600,
            750,
            1200,
            2400,
            4800,
            9600,
            19200,
            31250,
            38400,
            57600,
            74880,
            115200,
            230400,
            250000,
            460800,
            500000
  ];

  const handleBaudSelect = (baud) => {
    setSelectedBaud(baud);
    console.log("Selected ",selectedBaud)
  };

  return (
    <div className="baud-selector">
      <h5>Baud: {selectedBaud} baud</h5>
      <ul>
        {baudList  &&
          baudList.map((baud, index) => (
            <li key={index} onClick={() => handleBaudSelect(baud)}>
              {baud} baud
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BaudSelector;
