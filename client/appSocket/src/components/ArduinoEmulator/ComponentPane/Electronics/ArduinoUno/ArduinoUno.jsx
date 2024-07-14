import React, { useState } from 'react';
import ArduinoData from '../../../../../assets/Arduino/jsons/Arduino.json';
import ArduinoUnoSVG from '../../../../../assets/Arduino/images/components/ArduinoUno.svg';
import Pin from '../Common/Pin';
import './ArduinoUno.css';

const Rectangle = ({ element, scaleFactor }) => (
  <rect
    width={element.width * scaleFactor}
    height={element.height * scaleFactor}
    x={element.x * scaleFactor}
    y={element.y * scaleFactor}
    fill={element.fill}
    radius={element.radius}
  />
);

const ArduinoUno = () => {
  const { draw, pins } = ArduinoData;
  const [hoveredPin, setHoveredPin] = useState(null);
  const scaleFactor = 350 / 456;

  const handleMouseEnter = (pin) => {
    setHoveredPin(pin);
  };

  const handleMouseLeave = () => {
    setHoveredPin(null);
  };

  return (
    <div className="component-container">
      <svg width="350" height="260" className="component-svg">
        <image href={ArduinoUnoSVG} width="350" height="260" className="component-image" />
        {draw.map((element, index) => (
          element.type === 'rectangle' && (
            <Rectangle key={index} element={element} scaleFactor={scaleFactor} />
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
          />
        ))}
      </svg>
    </div>
  );
};

export default ArduinoUno;
