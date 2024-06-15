// WebSocketProvider.jsx

import React, { createContext, useEffect, useState, useCallback } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState("");
  const [ip, setIp] = useState('ws://localhost');
  const [port, setPort] = useState('9002');
  const [messageHandler, setMessageHandler] = useState("");
  const [comPort, setComPort] = useState(""); // State for received COM port data
  const [board, setBoard] = useState({}); // State for received board data
  
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

      if (event.data && event.data.slice && event.data.slice(0, 4) === 'Port') {
        const lines = event.data.split('\n').slice(1);
        const ports = lines
          .map((line) => {
            const parts = line.trim().split(/\s+/);
            if(parts[4] === "(USB)")
            {
              return parts[0];
            }
          })
          .filter((port) => port);
        setComPort(ports);
      }

      if (event.data && event.data.startsWith('Board Name')) {
        let lines = event.data.split('\n');
        let boards = {}
        for(let i = 1; i<lines.length;i++)
        {
          let lineData = lines[i].split(' ');
          let BoardName = ""
          let FQBN = lineData[lineData.length - 1]
          for (let j = 0 ; j < lineData.length - 1; j ++)
          {
            BoardName += lineData[j]+" "
          } 
          if(BoardName != "" && FQBN != "" )
          {
            boards[BoardName] = FQBN  
          }
        }
        setBoard(boards)
      }

    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket connection closed', event);
      setTimeout(connectWebSocket, 15000);
    };

    setSocket(newSocket);
  }, [ip, port, messageHandler]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  const setSocketMessageHandler = useCallback((handler) => {
    setMessageHandler(() => handler);
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        ip,
        setIp,
        port,
        setPort,
        setSocketMessageHandler,
        comPort,
        board,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
