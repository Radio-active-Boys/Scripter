import React, { useState } from 'react';
import './Workspace.css';

const Workspace = () => {
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const component = JSON.parse(event.dataTransfer.getData('component'));
    const newComponent = {
      ...component,
      id: components.length,
      x: event.clientX,
      y: event.clientY,
      width: 100,
      height: 100
    };
    setComponents([...components, newComponent]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const startConnecting = (id) => {
    const newConnections = [...connections, { from: id, to: null, color: 'black' }];
    setConnections(newConnections);
  };

  const finishConnecting = (id) => {
    const newConnections = connections.map((conn) => 
      conn.to === null ? { ...conn, to: id } : conn
    );
    setConnections(newConnections);
  };

  const changeWireColor = (index, color) => {
    const newConnections = connections.map((conn, i) => 
      i === index ? { ...conn, color } : conn
    );
    setConnections(newConnections);
  };

  return (
    <div className="workspace" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>Workspace</h2>
      <div className="workspace-container">
        {components.map((component) => (
          <div
            key={component.id}
            className="placed-component"
            style={{ left: component.x, top: component.y, width: component.width, height: component.height }}
            draggable
            onDragStart={() => startConnecting(component.id)}
            onDragEnd={() => finishConnecting(component.id)}
          >
            <component.type style={{ width: '100%', height: '100%' }} />
          </div>
        ))}
      </div>
      {connections.map((conn, index) => (
        conn.to !== null && (
          <svg key={index} className="connection-line">
            <line
              x1={components[conn.from].x}
              y1={components[conn.from].y}
              x2={components[conn.to].x}
              y2={components[conn.to].y}
              stroke={conn.color}
              strokeWidth="2"
            />
            <input
              type="color"
              value={conn.color}
              onChange={(e) => changeWireColor(index, e.target.value)}
              style={{ position: 'absolute', left: (components[conn.from].x + components[conn.to].x) / 2, top: (components[conn.from].y + components[conn.to].y) / 2 }}
            />
          </svg>
        )
      ))}
    </div>
  );
};

export default Workspace;
