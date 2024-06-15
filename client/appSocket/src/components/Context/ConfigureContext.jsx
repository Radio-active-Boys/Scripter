import React, { createContext, useState } from 'react';

export const ConfigureContext = createContext();

export const ConfigureProvider = ({ children }) => {
  const [getBaud, setBaud] = useState('9600');
  const [getPort, setPort] = useState("");
  const [getBoard, setBoard] = useState("");
  const [getFQBN, setFQBN] = useState("");

  return (
    <ConfigureContext.Provider 
      value={{ 
        getBaud, 
        setBaud, 
        getPort, 
        setPort, 
        getBoard, 
        setBoard,
        getFQBN,
        setFQBN, 
      }}
    >
      {children}
    </ConfigureContext.Provider>
  );
};
