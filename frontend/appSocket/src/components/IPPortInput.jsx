import React, { useContext } from 'react';
import { WebSocketContext } from './WebSocketContext';
import './IPPortInput.css';

const IPPortInput = () => {
  const { ip, setIp, port, setPort } = useContext(WebSocketContext);

  return (
    <div className="ip-port-input-container">
      <label>
        IP Address:
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="IP Address"
        />
      </label>
      <label>
        Port:
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Port"
        />
      </label>
    </div>
  );
};

export default IPPortInput;