import React, { createContext, useEffect, useState, useCallback } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [ip, setIp] = useState('ws://localhost');
  const [port, setPort] = useState('9002');
  const [messageHandler, setMessageHandler] = useState(null);

  const connectWebSocket = useCallback(() => {
    const newSocket = new WebSocket(`${ip}:${port}`);

    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      if (messageHandler) {
        messageHandler(event.data);
      }
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket connection closed', event);
      // Try to reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    };
  }, [ip, port, messageHandler]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  return (
    <WebSocketContext.Provider value={{ socket, ip, setIp, port, setPort, setMessageHandler }}>
      {children}
    </WebSocketContext.Provider>
  );
};
