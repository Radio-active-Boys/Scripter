import React, { useEffect, useState } from 'react';
import '@wokwi/elements'; // Ensure elements are imported
import './ComponentPane.css'
const ComponentPane = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const availableComponents = [
      { name: '7 Segment', type: 'wokwi-7segment',},
      { name: 'Arduino Mega', type: 'wokwi-arduino-mega' },
      { name: 'Arduino Nano', type: 'wokwi-arduino-nano' },
      { name: 'Arduino Uno', type: 'wokwi-arduino-uno' },
      { name: 'Buzzer', type: 'wokwi-buzzer' },
      { name: 'DHT22', type: 'wokwi-dht22' },
      { name: 'LCD1602', type: 'wokwi-lcd1602' },
      { name: 'Membrane Keypad', type: 'wokwi-membrane-keypad' },
      { name: 'Neopixel', type: 'wokwi-neopixel' },
      { name: 'Resistor', type: 'wokwi-resistor' },
      { name: 'Servo (Default)', type: 'wokwi-servo' },
      { name: 'SSD1306', type: 'wokwi-ssd1306' },
      { name: 'Analog Joystick', type: 'wokwi-analog-joystick' },
      { name: 'Biaxial Stepper', type: 'wokwi-biaxial-stepper' },
      { name: 'Big Sound Sensor (Default)', type: 'wokwi-big-sound-sensor' },
      { name: 'DIP Switch 8', type: 'wokwi-dip-switch-8' },
      { name: 'DS 1307', type: 'wokwi-ds1307' },
      { name: 'ESP32 Devkit V1', type: 'wokwi-esp32-devkit-v1' },
      { name: 'Flame Sensor', type: 'wokwi-flame-sensor' },
      { name: 'Franzininho', type: 'wokwi-franzininho' },
      { name: 'Gas Sensor HCSR 04', type: 'wokwi-gas-sensor-hcsr04' },
      { name: 'Heart Beat Sensor', type: 'wokwi-heartbeat-sensor' },
      { name: 'HX711', type: 'wokwi-hx711' },
      { name: 'ILI9341', type: 'wokwi-ili9341' },
      { name: 'IR Receiver', type: 'wokwi-ir-receiver' },
      { name: 'IR Remote', type: 'wokwi-ir-remote' },
      { name: 'KS2E-M-DC5', type: 'wokwi-ks2e-m-dc5' },
      { name: 'LCD2004', type: 'wokwi-lcd2004' },
      { name: 'Led Bar Graph', type: 'wokwi-led-bar-graph' },
      { name: 'LED', type: 'wokwi-led' },
      { name: 'LED Ring', type: 'wokwi-led-ring' },
      { name: 'microSD Card', type: 'wokwi-microsd-card' },
      { name: 'MPU6050', type: 'wokwi-mpu6050' },
      { name: 'Nano RP2040 Connect', type: 'wokwi-nano-rp2040-connect' },
      { name: 'NTC Temperature Sensor', type: 'wokwi-ntc-temperature-sensor' },
      { name: 'Photoresistor Sensor', type: 'wokwi-photoresistor-sensor' },
      { name: 'PIR Motion Sensor', type: 'wokwi-pir-motion-sensor' },
      { name: 'Potentiometer', type: 'wokwi-potentiometer' },
      { name: 'Pushbutton', type: 'wokwi-pushbutton' },
      { name: 'RGB Led', type: 'wokwi-rgb-led' },
      { name: 'Rotary Dialer', type: 'wokwi-rotary-dialer' },
      { name: 'Slide Potentiometer', type: 'wokwi-slide-potentiometer' },
      { name: 'Slide Switch', type: 'wokwi-slide-switch' },
      { name: 'Small Sound Sensor', type: 'wokwi-small-sound-sensor' },
      { name: 'Stepper Motor', type: 'wokwi-stepper-motor' },
      { name: 'Tilt Switch', type: 'wokwi-tilt-switch' },
    ];

    setComponents(availableComponents);
    
  }, []);

  const handleDragStart = (event, component) => {
    event.dataTransfer.setData('component', JSON.stringify(component));
    console.log(components)
  };


  return (
    <div className="component-pane">
      <h2>Components</h2>
      {components.map((component, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, component)}
          className="draggable-component"
        >
          <div>{component.name}</div>
          <div>
            <component.type></component.type>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentPane;
