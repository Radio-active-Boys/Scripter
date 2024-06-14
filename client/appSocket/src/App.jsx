import React from 'react';
import { WebSocketProvider } from './components/HandleWebSocket/WebSocketContext';
import UpperInput from './components/UpperInput';
import CodeEditor from './components/Editor/CodeEditor';

import './App.css';

const App = () => {
  return (
    <WebSocketProvider>
      <div className="App">
        <UpperInput />
        <CodeEditor />
      </div>
    </WebSocketProvider>
  );
};

export default App;
