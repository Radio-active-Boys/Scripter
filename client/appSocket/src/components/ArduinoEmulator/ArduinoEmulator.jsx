// ArduinoEmulator.jsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentPane from './ComponentPane/ComponentPane';
import Workspace2 from './Workspace/Workspace2';
import './ArduinoEmulator.css';

const ArduinoEmulator = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="arduino-emulator">
        <ComponentPane />
        <Workspace2 />
      </div>
    </DndProvider>
  );
};

export default ArduinoEmulator;
