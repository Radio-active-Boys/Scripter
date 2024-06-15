import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../HandleWebSocket/WebSocketContext';
import './ComPortSelector.css';

const ComPortSelector = ({ onClose }) => {
  const { socket, setSocketMessageHandler, comPort } = useContext(WebSocketContext);
  const [selectedPort, setSelectedPort] = useState(null);

  const fetchComPorts = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('get-port');
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  useEffect(() => {
    fetchComPorts();
  }, [fetchComPorts]);

  const handlePortSelect = (port) => {
    setSelectedPort(port);
    console.log("Selected ",selectedPort)
  };

  return (
    <div className="com-port-selector">
      <h5>Port: {selectedPort}</h5>
      <ul>
        {comPort &&
          comPort.map((port, index) => (
            <li key={index} onClick={() => handlePortSelect(port)}>
              {port}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ComPortSelector;
