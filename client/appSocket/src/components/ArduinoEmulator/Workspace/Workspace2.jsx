import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Workspace2.css';

const Workspace2 = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Handle zooming with the mouse wheel
  const handleWheel = useCallback((event) => {
    event.preventDefault();
    const delta = event.deltaY;
    const newZoom = Math.max(0.01, Math.min(20, zoom * (0.999 ** delta)));
    setZoom(newZoom);
    canvasRef.current.style.transform = `scale(${newZoom})`;
    canvasRef.current.style.transformOrigin = 'top left';
    console.log(`Zoom level changed to: ${newZoom}`);
  }, [zoom]);

  // Key down event for deleting components
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedComponent) {
        console.log(`Deleting component: ${selectedComponent.id}`);
        setComponents(components.filter(comp => comp.id !== selectedComponent.id));
        setSelectedComponent(null); // Reset selected component
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [components, selectedComponent]);

  // Handle dropping components into the workspace
  const handleDrop = (event) => {
    event.preventDefault();
    const component = JSON.parse(event.dataTransfer.getData('component'));
    const newComponent = {
      ...component,
      id: `comp_${components.length}_${Date.now()}`,
      x: (event.clientX - pan.x) / zoom,
      y: (event.clientY - pan.y) / zoom,
    };
    console.log(`Adding new component: ${JSON.stringify(newComponent)}`);
    setComponents([...components, newComponent]);
  };

  // Prevent default behavior for drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Mouse down event for selecting or panning
  const handleMouseDown = (event) => {
    if (event.button === 0) {
      const target = event.target;
      if (target.classList.contains('placed-component')) {
        const id = target.dataset.id;
        const comp = components.find(comp => comp.id === id);
        setSelectedComponent(comp);
        setIsDragging(true);
        console.log(`Selected component for dragging: ${id}`);
      } else {
        setIsPanning(true);
        console.log("Starting pan...");
      }
    }
  };

  // Effect for handling mouse and drag events
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    canvas.addEventListener('wheel', handleWheel);
    container.addEventListener('drop', handleDrop);
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('mousedown', handleMouseDown);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      container.removeEventListener('drop', handleDrop);
      container.removeEventListener('dragover', handleDragOver);
      container.removeEventListener('mousedown', handleMouseDown);
    };
  }, [zoom, isDragging, selectedComponent, pan,  components]);

  // Function to add a new component
  const addComponent = () => {
    const newComponent = {
      id: Date.now(),
      x: Math.random() * (canvasRef.current.width / zoom - 50),
      y: Math.random() * (canvasRef.current.height / zoom - 50),
    };
    console.log(`Adding component: ${JSON.stringify(newComponent)}`);
    setComponents([...components, newComponent]);
  };

  // Function to delete the selected component
  const deleteComponent = () => {
    if (selectedComponent) {
      console.log(`Deleting selected component: ${selectedComponent.id}`);
      setComponents(components.filter(c => c.id !== selectedComponent.id));
      setSelectedComponent(null);
    }
  };

  return (
    <div className="workspace">
      <h2>Workspace</h2>
      <button onClick={addComponent}>Add Component</button>
      <button onClick={deleteComponent} disabled={!selectedComponent}>Delete Selected Component</button>
      <div className="workspace-container" ref={containerRef}>
        <canvas
          ref={canvasRef}
          className="canvas"
          width={800}
          height={600}
        />
        {components.map(component => (
          <div
            key={component.id}
            className={`component placed-component ${selectedComponent?.id === component.id ? 'selected' : ''}`}
            data-id={component.id}
            style={{
              position: 'absolute',
              left: `${component.x * zoom}px`,
              top: `${component.y * zoom}px`,
              width: '50px',
              height: '50px',
              backgroundColor: 'lightblue',
              border: selectedComponent?.id === component.id ? '2px solid white' : '1px solid gray',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Workspace2;
