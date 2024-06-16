import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import './Display.css';

const Display = ({ customResponses }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();

    terminal.clear();
    customResponses.forEach(response => {
      terminal.writeln(response);
    });

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      terminal.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [customResponses]);

  return <div ref={terminalRef} className='display-container'></div>;
};

export default Display;
