// ComPortSelector.jsx
import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from './WebSocketContext';
import './ComPortSelector.css';

const ComPortSelector = () => {
  const { socket, setMessageHandler } = useContext(WebSocketContext);
  const [comPorts, setComPorts] = useState([]);
  const [selectedComPort, setSelectedComPort] = useState('');

  useEffect(() => {
    const handleMessage = (data) => {
      const message = JSON.parse(data);
      if (message.type === 'COM_PORTS_LIST') {
        setComPorts(message.data);
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

  const handleComPortSelect = (comPort) => {
    setSelectedComPort(comPort);
    // Later send this to the server
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
