import React, { useContext } from 'react';
import { ConfigureContext } from '../Context/ConfigureContext';
import './BaudSelector.css';

const BaudSelector = () => {
  const { getBaud, setBaud } = useContext(ConfigureContext);

  const baudList = [
    300, 600, 750, 1200, 2400, 4800, 9600, 19200, 31250, 38400,
    57600, 74880, 115200, 230400, 250000, 460800, 500000
  ];

  const handleBaudSelect = (baud) => {
    setBaud(baud);
    console.log("Selected ", baud);
  };

  return (
    <div className="baud-selector">
      <h5>Baud: {getBaud} baud</h5>
      <ul>
        {baudList.map((baud, index) => (
          <li key={index} onClick={() => handleBaudSelect(baud)}>
            {baud} baud
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaudSelector;
