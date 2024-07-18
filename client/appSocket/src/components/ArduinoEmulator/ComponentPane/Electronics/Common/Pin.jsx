import React, { useContext } from 'react';
import Tooltip from './Tooltip';
import './Pin.css';
import { WireContext } from './WireContext';

const Pin = ({ pin, scaleFactor, hoveredPin, onMouseEnter, onMouseLeave }) => {
  const { startWire, endWire, currentWire } = useContext(WireContext);

  const handleClick = () => {
    const adjustedPin = {
      ...pin,
      x: pin.x * scaleFactor+3,
      y: pin.y * scaleFactor+2, 
    };

    if (currentWire) {
      endWire(adjustedPin);
    } else {
      startWire(adjustedPin);
    }
  };

  return (
    <g
      onMouseEnter={() => onMouseEnter(pin)}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <rect
        className={`component-pin ${hoveredPin === pin ? 'hovered' : ''}`}
        x={pin.x * scaleFactor}
        y={pin.y * scaleFactor}
        width={6}
        height={6}
        aria-label={pin.name}
      />
      {hoveredPin === pin && (
        <Tooltip
          x={pin.x * scaleFactor}
          y={pin.y * scaleFactor}
          name={pin.name}
        />
      )}
    </g>
  );
};

export default Pin;
