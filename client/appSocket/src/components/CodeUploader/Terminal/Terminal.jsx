import React, { useState, useRef, useContext } from 'react';
import Display from './Display';
import Controller from './Controller'; 
import './Terminal.css';
import { WebSocketContext } from '../HandleWebSocket/WebSocketContext';

const Terminal = () => {
  const [height, setHeight] = useState(200); 
  const terminalContainerRef = useRef(null);
  const [size, setSize] = useState(0);
  const { TerminalResponse, clearTerminalResponse } = useContext(WebSocketContext);
  
  const handleResize = (e) => {
    const newHeight = window.innerHeight - e.clientY;
    if (newHeight > 100 && newHeight < window.innerHeight) { 
      setHeight(newHeight);
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const adjustSizeTerminal = () => {
    if(size === 1) {
      setHeight(window.innerHeight * (1 - 0.5));
      setSize(0);
    } else {
      setHeight(window.innerHeight * (1 - 1));
      setSize(1);
    }
  };

  const clearTerminalText = () => {
    clearTerminalResponse();
  };

  return (
    <div>
      <div 
        className="resizer" 
        onMouseDown={handleMouseDown} 
      >
        <div className="terminal-wrapper">
          <div className="controller-container">
            <Controller 
              resizeTerminal={adjustSizeTerminal} 
              clearTerminal={clearTerminalText}
            />
          </div>
          <div 
            ref={terminalContainerRef} 
            className="terminal-container" 
            style={{ height }}
          >
            <Display customResponses={TerminalResponse} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
