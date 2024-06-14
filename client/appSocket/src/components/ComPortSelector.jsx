import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from './WebSocketContext';
import './ComPortSelector.css';

const ComPortSelector = () => {
  const { socket, setMessageHandler } = useContext(WebSocketContext);
  const [comPorts, setComPorts] = useState([]);
  const [selectedComPort, setSelectedComPort] = useState('');
  const [dropdownClicked, setDropdownClicked] = useState(false);

  useEffect(() => {
    const handleMessage = (data) => {
      // Manually parse the response to extract COM ports
      if (data.slice(0,4) === "Port")
      {        
        const lines = data.split('\n').slice(1); // Skip the header line
        const ports = lines.map(line => {
        const parts = line.trim().split(/\s+/); // Split by whitespace
        return parts[0]; // Extract the COM port name
        }).filter(port => port); // Remove any empty strings

        setComPorts(ports);
        console.log(ports);
      }
    };

    setMessageHandler(() => handleMessage);
  }, [setMessageHandler]);

  const fetchComPorts = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('get-port');
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  const handleComPortSelect = (event) => {
    setSelectedComPort(event.target.value);
  };

  const handleDropdownClick = () => {
    setDropdownClicked(true);
  };

  return (
    <div className="com-port-selector">
      <select
        value={selectedComPort}
        onChange={handleComPortSelect}
        onClick={handleDropdownClick}
      >
        <option value="" disabled>
          {dropdownClicked ? 'Loading COM Ports...' : 'Select COM Port'}
        </option>
        {comPorts.map((comPort, index) => (
          <option key={index} value={comPort}>
            {comPort}
          </option>
        ))}
      </select>
      {selectedComPort && <p>Selected COM Port: {selectedComPort}</p>}
    </div>
  );
};

export default ComPortSelector;
