import React, { useState } from 'react';
import ArduinoData from '../../../../../assets/Arduino/jsons/Arduino.json';
import ArduinoUnoSVG from '../../../../../assets/Arduino/images/components/ArduinoUno.svg';
import Pin from '../Common/Pin';
import './ArduinoUno.css';

const ArduinoUno = () => {
  const { draw, pins } = ArduinoData;
  const [hoveredPin, setHoveredPin] = useState(null);
  const scaleFactor = 350 / 456;

  const handleMouseEnter = (pin) => setHoveredPin(pin);
  const handleMouseLeave = () => setHoveredPin(null);

  return (
    <div className="component-container">
      <svg width="350" height="260" className="component-svg" style={{ background: 'transparent' }}>
        <defs>
          <clipPath id="arduinoClip">
            <path d="M0,0 L350,0 L350,260 L0,260 Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#arduinoClip)">
          <image href={ArduinoUnoSVG} width="350" height="260" className="component-image" />
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
          {/* Exact path for the component outline */}
          <path
            d="M10,10 L340,10 L340,250 L10,250 Z" // Replace with actual outline path
            fill="none"
          />
          {pins.map((pin, index) => (
            <Pin
              key={index}
              pin={pin}
              scaleFactor={scaleFactor}
              hoveredPin={hoveredPin}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ArduinoUno;
