import React from 'react';
import Tooltip from './Tooltip';
import './Pin.css';

const Pin = ({ pin, scaleFactor, hoveredPin, onMouseEnter, onMouseLeave }) => {
  return (
    <g onMouseEnter={() => onMouseEnter(pin)} onMouseLeave={onMouseLeave}>
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
