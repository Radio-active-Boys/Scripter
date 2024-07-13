// ArduinoEmulator.jsx
import React from 'react';
import ComponentPane from './ComponentPane/ComponentPane';
import Workspace from './Workspace/Workspace';
import Simulation from './Simulation/Simulation';
import './ArduinoEmulator.css';

const ArduinoEmulator = () => {
  return (
    <div className="arduino">
      <div className="left-pane">
        <ComponentPane />
      </div>
      <div className="right-pane">
        <Workspace />
      </div>
      <div className="bottom-pane">
        <Simulation />
      </div>
    </div>
  );
};

export default ArduinoEmulator;
