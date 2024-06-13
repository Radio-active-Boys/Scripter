import React, { createContext, useEffect, useState, useCallback } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [ip, setIp] = useState('ws://192.168.175.182');
  const [port, setPort] = useState('9002');

  const connectWebSocket = useCallback(() => {
    const newSocket = new WebSocket(`${ip}:${port}`);
    
    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setTimeout(connectWebSocket, 5000); // Try to reconnect after 5 seconds
    };
  }, [ip, port]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  return (
    <WebSocketContext.Provider value={{ socket, ip, setIp, port, setPort }}>
      {children}
    </WebSocketContext.Provider>
  );
};
