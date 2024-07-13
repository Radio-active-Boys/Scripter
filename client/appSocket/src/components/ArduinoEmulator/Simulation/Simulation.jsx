import React from 'react';
import { parse } from 'intel-hex';
import { CPU, avrInstruction, AVRIOPort, portDConfig, PinState, AVRTimer, timer0Config } from 'avr8js';

const Simulation = () => {
  const arduinoCode = `
    void setup() {
      pinMode(7, OUTPUT);
    }

    void loop() {
      digitalWrite(7, HIGH);
      delay(1000);
      digitalWrite(7, LOW);
      delay(1000);
    }
  `;

  const runCode = async () => {
    // Compile Arduino source code
    const result = await fetch('https://hexi.wokwi.com/build', {
      method: 'post',
      body: JSON.stringify({ sketch: arduinoCode }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { hex, stderr } = await result.json();
    if (!hex) {
      alert(stderr);
      return;
    }
    const { data } = parse(hex);
    const progData = new Uint8Array(data.buffer);

    // Set up simulation
    const cpu = new CPU(new Uint16Array(progData.buffer));
    const port = new AVRIOPort(cpu, portDConfig);
    port.addListener(() => {
      const turnOn = port.pinState(7) === PinState.High;
      console.log('LED', turnOn);
    });
    const timer = new AVRTimer(cpu, timer0Config);

    // Run simulation
    while (true) {
      for (let i = 0; i < 500000; i++) {
        avrInstruction(cpu);
        timer.tick();
      }
      await new Promise(resolve => setTimeout(resolve));
    }
  };

  return (
    <div className="simulation">
      <h2>Simulation</h2>
      <button onClick={runCode}>Run</button>
      <textarea value={arduinoCode} readOnly />
    </div>
  );
};

export default Simulation;
