import React, { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './Workspace2.css';

const Workspace2 = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dropRef = useRef(null);
  const scale = 1;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const containerRect = dropRef.current.getBoundingClientRect();

      const newX = (offset.x - containerRect.left - 140) / scale;
      const newY = (offset.y - containerRect.top - 140) / scale;

      const newComponent = {
        ...item,
        id: `comp_${components.length}_${Date.now()}`,
        x: newX,
        y: newY,
      };

      setComponents((prev) => [...prev, newComponent]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedComponent) {
        deleteSelectedComponent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent]);

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
      const containerRect = dropRef.current.getBoundingClientRect();
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
    <div className="workspace2" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <h2>Workspace</h2>
      <button onClick={deleteSelectedComponent} disabled={!selectedComponent}>
        Delete Selected Component
      </button>
  
      <TransformWrapper>
        <TransformComponent>
          <div
            ref={(node) => {
              dropRef.current = node;
              drop(node);
            }}
            className="workspace-container2"
            style={{ width: '100vw', height: '100vh', position: 'relative' }}
            onMouseDown={handleMouseDown}
          >
            {components.map((component) => (
              <div
                key={component.id}
                className={`placed-component ${selectedComponent?.id === component.id ? 'selected' : ''}`}
                data-id={component.id}
                style={{
                  position: 'absolute',
                  left: `${component.x}px`,
                  top: `${component.y}px`,
                }}
                onClick={() => setSelectedComponent(component)}
              >
                {component.component}
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
  
};

export default Workspace2;
