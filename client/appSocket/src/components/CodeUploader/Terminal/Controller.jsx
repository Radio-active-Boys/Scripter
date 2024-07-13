// src/components/Terminal/Controller.jsx
import React from 'react';
import './Controller.css'
const Controller = ({ resizeTerminal,clearTerminal}) => {
  return (
    <div className="controller-icons">
      <button className="size-button" onClick={resizeTerminal}></button>
      <button className="clear-button" onClick={clearTerminal}></button>
    </div>
  );
};

export default Controller;
