import React, { useState, useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './Workspace2.css';

const Workspace2 = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const SelectedComponentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedComponent) {
        deleteSelectedComponent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent]);

  const handleDrop = (event) => {
    event.preventDefault();
    const component = JSON.parse(event.dataTransfer.getData('component'));
    const containerRect = event.currentTarget.getBoundingClientRect();

    // Calculate the new component position based on the cursor's position in the container
    const newComponent = {
      ...component,
      id: `comp_${components.length}_${Date.now()}`,
      x: (event.clientX - containerRect.left - 65) / scale,
      y: (event.clientY - containerRect.top - 65) / scale,
    };

    setComponents((prev) => [...prev, newComponent]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      const target = event.target.closest('.placed-component');

      if (target) {
        const id = target.dataset.id;
        const comp = components.find((comp) => comp.id === id);
        setSelectedComponent(comp);
        setIsDragging(true);
        const rect = target.getBoundingClientRect();
        setDragOffset({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
        event.stopPropagation();
      } else {
        setSelectedComponent(null);
      }
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging && selectedComponent) {
      const containerRect = event.currentTarget.getBoundingClientRect();
      const newX = (event.clientX - containerRect.left - dragOffset.x) / scale;
      const newY = (event.clientY - containerRect.top - dragOffset.y) / scale;

      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === selectedComponent.id ? { ...comp, x: newX, y: newY } : comp
        )
      );

      event.stopPropagation();
    }
  };

  const handleMouseUp = (event) => {
    if (isDragging) {
      setIsDragging(false);
      event.stopPropagation();
    }
  };

  const deleteSelectedComponent = () => {
    if (selectedComponent) {
      setComponents((prev) => prev.filter((c) => c.id !== selectedComponent.id));
      setSelectedComponent(null);
    }
  };

  return (
    <div className="workspace2">
      <h2>Workspace</h2>
      <button onClick={deleteSelectedComponent} disabled={!selectedComponent}>
        Delete Selected Component
      </button>

      <TransformWrapper
        options={{ limitToBounds: false }}
        wheel={{ step: 0.1 }}
        onZoomChange={(e) => setScale(e.scale)}
      >
        <TransformComponent>
          <div
            className="workspace-container2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ width: '100vw', height: '100vh'}}
          >
            {components.map((component) => (
              <div
                key={component.id}
                className={`component placed-component ${selectedComponent?.id === component.id ? 'selected' : ''}`}
                data-id={component.id}
                style={{
                  left: `${component.x * scale}px`,
                  top: `${component.y * scale}px`,
                }}
                onClick={() => setSelectedComponent(component)}
              >
                <component.type />
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Workspace2;
