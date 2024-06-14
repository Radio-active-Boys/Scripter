import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../HandleWebSocket/WebSocketContext';
import './ComPortSelector.css';

const ComPortSelector = ({ onClose }) => {
  const { socket, setMessageHandler } = useContext(WebSocketContext);
  const [comPorts, setComPorts] = useState([]);
  const [selectedComPort, setSelectedComPort] = useState('');

  useEffect(() => {
    const handleMessage = (data) => {
      if (data && data.slice && data.slice(0, 4) === 'Port') {
        const lines = data.split('\n').slice(1);
        const ports = lines
          .map((line) => {
            const parts = line.trim().split(/\s+/);
            return parts[0];
          })
          .filter((port) => port);

        setComPorts(ports);
      }
    };

    setMessageHandler(handleMessage);

    return () => setMessageHandler(null);
  }, [setMessageHandler]);

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

  return (
    <div className="com-port-selector">
      <h2>Available COM Ports:</h2>
      <ul>
        {comPorts.length > 0 ? (
          comPorts.map((port, index) => (
            <li key={index}>{port}</li>
          ))
        ) : (
          <li>No COM ports available</li>
        )}
      </ul>
    </div>
  );
};

export default ComPortSelector;
