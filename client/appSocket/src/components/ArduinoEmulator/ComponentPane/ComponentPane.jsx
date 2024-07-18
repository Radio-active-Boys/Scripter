import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import ArduinoUno from './Electronics/ArduinoUno/ArduinoUno';4
import Battery9V from './Electronics/ArduinoUno/Battery9V';
import '@wokwi/elements';
import './ComponentPane.css';

const ComponentPane = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const availableComponents = [
      { name: 'Arduino UNO', component: <ArduinoUno /> },
      { name: 'Battery9V', component: <Battery9V /> },
    ];
    setComponents(availableComponents);
  }, []);

  const DraggableComponent = ({ component }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'component',
      item: { ...component },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className="draggable-component"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div>{component.name}</div>
        <div>{component.component}</div>
      </div>
    );
  };

  return (
    <div className="component-pane">
      <h2>Components</h2>
      {components.map((component, index) => (
        <DraggableComponent key={index} component={component} />
      ))}
    </div>
  );
};

export default ComponentPane;
