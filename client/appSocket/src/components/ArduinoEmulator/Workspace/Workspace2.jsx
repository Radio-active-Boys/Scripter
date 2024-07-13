import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './Workspace2.css';

const Workspace2 = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [scale, setScale] = useState(1); // State to keep track of the current scale

  // Key down event for deleting components
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedComponent) {
        setComponents(prev => prev.filter(comp => comp.id !== selectedComponent.id));
        setSelectedComponent(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent]);

  // Handle dropping components into the workspace
  const handleDrop = (event) => {
    event.preventDefault();
    const component = JSON.parse(event.dataTransfer.getData('component'));
    const newComponent = {
      ...component,
      id: `comp_${components.length}_${Date.now()}`,
      x: event.clientX / scale,
      y: event.clientY / scale,
    };
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

      // Check if the click is on a placed component
      if (target.classList.contains('placed-component')) {
        const id = target.dataset.id;
        const comp = components.find(comp => comp.id === id);
        setSelectedComponent(comp);
        setIsDragging(true);
        const rect = target.getBoundingClientRect();
        setDragOffset({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
        event.stopPropagation(); // Prevent background drag
      } else {
        // Deselect the component if clicking on empty space
        setSelectedComponent(null);
      }
    }
  };

  // Mouse move event for dragging components
  const handleMouseMove = (event) => {
    if (isDragging && selectedComponent) {
      const containerRect = event.currentTarget.getBoundingClientRect();
      const newX = (event.clientX - containerRect.left - dragOffset.x) / scale;
      const newY = (event.clientY - containerRect.top - dragOffset.y) / scale;

      setComponents(prev => 
        prev.map(comp =>
          comp.id === selectedComponent.id ? { ...comp, x: newX, y: newY } : comp
        )
      );

      event.stopPropagation(); // Prevent background drag
    }
  };

  // Mouse up event to stop dragging
  const handleMouseUp = (event) => {
    if (isDragging) {
      setIsDragging(false);
      event.stopPropagation(); // Prevent background drag
    }
  };

  // Function to add a new component
  const addComponent = () => {
    const newComponent = {
      id: `comp_${components.length}_${Date.now()}`,
      x: Math.random() * (canvasSize.width - 50),
      y: Math.random() * (canvasSize.height - 50),
    };
    setComponents([...components, newComponent]);
  };

  const deleteComponent = () => {
    if (selectedComponent) {
      setComponents(prev => prev.filter(c => c.id !== selectedComponent.id));
      setSelectedComponent(null);
    }
  };

  return (
    <div className="workspace2">
      <h2>Workspace</h2>
      <button onClick={addComponent}>Add Component</button>
      <button onClick={deleteComponent} disabled={!selectedComponent}>
        Delete Selected Component
      </button>

      <TransformWrapper
        options={{ limitToBounds: false }}
        wheel={{ step: 0.1 }} // Adjust the zoom speed here
        onZoomChange={(e) => setScale(e.scale)} // Track scale changes
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <TransformComponent>
          <div
            className="workspace-container2"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
          >
            {components.map(component => (
              <div
                key={component.id}
                className={`component placed-component ${selectedComponent?.id === component.id ? 'selected' : ''}`}
                data-id={component.id}
                style={{
                  position: 'absolute',
                  left: `${component.x * scale}px`, // Adjust for zoom
                  top: `${component.y * scale}px`, // Adjust for zoom
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'lightblue',
                  border: selectedComponent?.id === component.id ? '2px solid white' : '1px solid gray',
                  cursor: 'grab',
                }}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Workspace2;
