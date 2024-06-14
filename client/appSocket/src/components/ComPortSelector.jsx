import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from './WebSocketContext';
import './ComPortSelector.css';

const ComPortSelector = () => {
  const { socket, setMessageHandler } = useContext(WebSocketContext);
  const [comPorts, setComPorts] = useState([]);
  const [selectedComPort, setSelectedComPort] = useState('');

  useEffect(() => {
    const handleMessage = (data) => {
      // Manually parse the response to extract COM ports
      const message = data.split('\n').slice(1); // Skip the header line
      const ports = message.map(line => {
        const parts = line.trim().split(/\s+/); // Split by whitespace
        return parts[0]; // Extract the COM port name
      }).filter(port => port); // Remove any empty strings

      setComPorts(ports);
      console.log(ports);
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

  const handleComPortSelect = (comPort) => {
    setSelectedComPort(comPort);
  };

  return (
    <div className="com-port-selector">
      <button onClick={fetchComPorts}>Select COM Port</button>
      {comPorts.length > 0 && (
        <ul className="com-port-list">
          {comPorts.map((comPort, index) => (
            <li key={index} onClick={() => handleComPortSelect(comPort)}>
              {comPort}
            </li>
          ))}
        </ul>
      )}
      {selectedComPort && <p>Selected COM Port: {selectedComPort}</p>}
    </div>
  );
};

export default ComPortSelector;
