import React, { useState } from 'react';
import Battery9VData from '../../../../../assets/Arduino/jsons/Battery9v.json';
import Battery9VSVG from '../../../../../assets/Arduino/images/components/9vBattery.svg';
import Pin from '../Common/Pin';
import Wire from '../Common/Wire';
import { WireProvider } from '../Common/WireContext';
import './Battery9V.css';

const Battery9V = () => {
  const { draw, pins } = Battery9VData;
  const [hoveredPin, setHoveredPin] = useState(null);
  const scaleFactor = 1;

  const handleMouseEnter = (pin) => setHoveredPin(pin);
  const handleMouseLeave = () => setHoveredPin(null);

  return (
    <WireProvider>
      <div className="component-container">
        <svg width="179" height="99" className="component-svg expanded-left" style={{ background: 'transparent' }}>
          <defs>
            <clipPath id="batteryClip">
              <path d="M0,0 L179,0 L179,99 L0,99 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#batteryClip)">
            <image href={Battery9VSVG} width="179" height="99" className="component-image" />
            {draw.map((element, index) => (
              element.type === 'rectangle' && (
                <rect
                  key={index}
                  width={element.width * scaleFactor}
                  height={element.height * scaleFactor}
                  x={element.x * scaleFactor}
                  y={element.y * scaleFactor}
                  fill={element.fill}
                />
              )
            ))}
            {pins.map((pin, index) => (
              <Pin
                key={index}
                pin={pin}
                scaleFactor={scaleFactor}
                hoveredPin={hoveredPin}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                x={pin.x }  
                y={pin.y }  
              />
            ))}
            <Wire />
          </g>
        </svg>
      </div>
    </WireProvider>
  );
};

export default Battery9V;
