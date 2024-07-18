import React, { createContext, useState } from 'react';

export const WireContext = createContext();

export const WireProvider = ({ children }) => {
  const [wires, setWires] = useState([]);
  const [currentWire, setCurrentWire] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const startWire = (pin) => {
    setCurrentWire({ start: pin, end: null });
  };

  const endWire = (pin) => {
    if (currentWire) {
      setWires([...wires, { ...currentWire, end: pin }]);
      setCurrentWire(null);
    }
  };

  const updateMousePosition = (x, y) => {
    setMousePosition({ x, y });
  };

  return (
    <WireContext.Provider value={{ wires, startWire, endWire, currentWire, mousePosition, updateMousePosition }}>
      {children}
    </WireContext.Provider>
  );
};
