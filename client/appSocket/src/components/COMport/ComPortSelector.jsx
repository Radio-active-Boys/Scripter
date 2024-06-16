import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../HandleWebSocket/WebSocketContext';
import { ConfigureContext } from '../Context/ConfigureContext';
import './ComPortSelector.css';

const ComPortSelector = () => {
  const { socket, comPort } = useContext(WebSocketContext);
  const { setPort } = useContext(ConfigureContext);  
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
  }, []);

  const handlePortSelect = (port) => {
    setSelectedPort(port);
    setPort(port);
    console.log("Selected ", port);
  };

  return (
    <div className="com-port-selector">
      <h5>Port: {selectedPort}</h5>
      <ul>
        {comPort && comPort.map((port, index) => (
          <li key={index} onClick={() => handlePortSelect(port)}>
            {port}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComPortSelector;
