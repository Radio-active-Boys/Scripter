import React from 'react';
import CodeEditor from './components/Editor/CodeEditor';
import Terminal from './components/Terminal/Terminal';
import { WebSocketProvider } from './components/HandleWebSocket/WebSocketContext';
import { ConfigureProvider } from './components/Context/ConfigureContext';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <WebSocketProvider>
        <ConfigureProvider>
          <CodeEditor />
          <Terminal />
        </ConfigureProvider>
      </WebSocketProvider>
    </div>
  );
};

export default App;
