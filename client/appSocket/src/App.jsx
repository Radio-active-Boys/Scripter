import React from 'react';
import { WebSocketProvider } from './components/HandleWebSocket/WebSocketContext';
import UpperInput from './components/UpperInput';
import CodeEditor from './components/Editor/CodeEditor';
import { ConfigureProvider } from './components/Context/ConfigureContext';
import './App.css';

const App = () => {
  return (
    <WebSocketProvider>
      <div className="App">
      <ConfigureProvider>
        <UpperInput />
        <CodeEditor />
      </ConfigureProvider>
        
      </div>
    </WebSocketProvider>
  );
};

export default App;
