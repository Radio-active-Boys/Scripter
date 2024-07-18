// wire.jsx
import React, { useContext, useEffect, useState } from 'react';
import { WireContext } from './WireContext';

const Wire = () => {
  const { wires, currentWire, startWire, setCurrentWire } = useContext(WireContext);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (currentWire) {
        const updatedWire = { ...currentWire, end: { x: e.clientX, y: e.clientY } };
        setCurrentWire(updatedWire); // Fix: Corrected function name
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [currentWire, setCurrentWire]);

  const renderWire = (wire) => {
    const { start, end } = wire;

    return (
      <line
        key={`${start.x}-${start.y}-${end.x}-${end.y}`} // Fix: Template literal was incorrect
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="green"
        strokeWidth="4"
      />
    );
  };

  const renderCurrentWire = () => {
    if (!currentWire || !currentWire.start) return null;
    const { start } = currentWire;

    return (
      <line
        x1={start.x}
        y1={start.y}
        x2={mousePosition.x}
        y2={mousePosition.y}
        stroke="green"
        strokeWidth="4"
      />
    );
  };

  return (
    <g>
      {wires.map((wire) => renderWire(wire))}
      {renderCurrentWire()}
    </g>
  );
};

export default Wire;
