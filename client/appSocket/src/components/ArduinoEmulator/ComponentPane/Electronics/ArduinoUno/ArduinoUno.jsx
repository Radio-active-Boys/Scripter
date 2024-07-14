import React, { useState } from 'react';
import ArduinoData from '../../../../../assets/Arduino/jsons/Arduino.json';
import ArduinoUnoSVG from '../../../../../assets/Arduino/images/components/ArduinoUno.svg';
import './ArduinoUno.css';

const Rectangle = ({ element, scaleFactor }) => (
  <rect
    className="arduino-draw"
    width={element.width * scaleFactor}
    height={element.height * scaleFactor}
    x={element.x * scaleFactor}
    y={element.y * scaleFactor}
    fill={element.fill}
    radius={element.radius}
  />
);

const Pin = ({ pin, scaleFactor, hoveredPin, onMouseEnter, onMouseLeave }) => (
  <rect
    className={`arduino-pin ${hoveredPin === pin ? 'hovered' : ''}`}
    x={pin.x * scaleFactor}
    y={pin.y * scaleFactor}
    width={6}
    height={6}
    onMouseEnter={() => onMouseEnter(pin)}
    onMouseLeave={onMouseLeave}
  >
    <title>{pin.name}</title>
  </rect>
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
    <div className="arduino-uno-container">
      <svg width="350" height="260" className="arduino-svg">
        <image href={ArduinoUnoSVG} width="350" height="260" className="arduino-image" />
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
