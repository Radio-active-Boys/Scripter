import React, { useState, useRef, useEffect } from 'react';
import './Workspace.css';

const Workspace = () => {
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isPanning, setIsPanning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const workspaceRef = useRef(null);
  const selectedComponent = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedComponent.current) {
        setComponents(components.filter(comp => comp.id !== selectedComponent.current));
        selectedComponent.current = null;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [components]);

  const handleDrop = (event) => {
    event.preventDefault();
    const component = JSON.parse(event.dataTransfer.getData('component'));
    const newComponent = {
      ...component,
      id: `comp_${components.length}_${Date.now()}`,
      x: (event.clientX - pan.x) / zoom,
      y: (event.clientY - pan.y) / zoom,
    };
    setComponents([...components, newComponent]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      if (event.target.classList.contains('placed-component')) {
        const id = event.target.dataset.id;
        selectedComponent.current = id;
      } else {
        setIsPanning(true);
      }
    }
  };

  const handleMouseMove = (event) => {
    if (isPanning) {
      const newPan = {
        x: pan.x + event.movementX,
        y: pan.y + event.movementY,
      };
      setPan(newPan);
    } else if (selectedComponent.current) {
      const componentIndex = components.findIndex(comp => comp.id === selectedComponent.current);
      if (componentIndex !== -1) {
        const updatedComponents = [...components];
        updatedComponents[componentIndex].x += event.movementX / zoom;
        updatedComponents[componentIndex].y += event.movementY / zoom;
        setComponents(updatedComponents);
      }
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const newZoom = Math.min(Math.max(0.5, zoom - event.deltaY * 0.001), 2);
    setZoom(newZoom);

    const workspaceEl = workspaceRef.current;
    const rect = workspaceEl.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;

    const newPan = {
      x: pan.x * (newZoom / zoom) + (1 - offsetX) * (rect.width * (1 - newZoom)),
      y: pan.y * (newZoom / zoom) + (1 - offsetY) * (rect.height * (1 - newZoom)),
    };
    setPan(newPan);
  };

  useEffect(() => {
    const workspaceEl = workspaceRef.current;
    workspaceEl.style.transform = `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`;
  }, [zoom, pan]);

  return (
    <div className="workspace">
      <h2>Workspace</h2>
      <div
        className="workspace-container"
        ref={workspaceRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {components.map((component) => (
          <div
            key={component.id}
            className="placed-component"
            data-id={component.id}
            style={{ left: component.x, top: component.y }}
            onClick={() => (selectedComponent.current = component.id)}
          >
            <component.type />
          </div>
        ))}
        {connections.map((conn, index) => (
          conn.to !== null && (
            <svg key={index} className="connection-line">
              <line
                x1={components.find(comp => comp.id === conn.from).x + 50}
                y1={components.find(comp => comp.id === conn.from).y + 50}
                x2={components.find(comp => comp.id === conn.to).x + 50}
                y2={components.find(comp => comp.id === conn.to).y + 50}
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          )
        ))}
      </div>
    </div>
  );
};

export default Workspace;
