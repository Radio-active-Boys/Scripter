import React from 'react';
import { WebSocketProvider } from './components/WebSocketContext';
import IPPortInput from './components/IPPortInput';
import CodeEditor from './components/CodeEditor';

import './App.css';

const App = () => {
  return (
    <WebSocketProvider>
      <div className="App">
        <IPPortInput />
        <CodeEditor />
      </div>
    </WebSocketProvider>
  );
};

export default App;
