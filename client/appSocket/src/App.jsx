import React from 'react';

import CodeEditor from './components/Editor/CodeEditor';
import { WebSocketProvider } from './components/HandleWebSocket/WebSocketContext';
import { ConfigureProvider } from './components/Context/ConfigureContext';
import './App.css';

const App = () => {
  return (
    <WebSocketProvider>
      <div className="App">
      <ConfigureProvider>
        <CodeEditor />
      </ConfigureProvider>
        
      </div>
    </WebSocketProvider>
  );
};

export default App;
