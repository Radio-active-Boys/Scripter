import React from 'react';
import CodeEditor from './Editor/CodeEditor';
import Terminal from './Terminal/Terminal';
import { WebSocketProvider } from './HandleWebSocket/WebSocketContext';
import { ConfigureProvider } from './Context/ConfigureContext';
import './CodeUploader.css'
const CodeUploader = () => {
  return (
    <div className='Uploader'>
      <WebSocketProvider>
        <ConfigureProvider>
          <CodeEditor />
          <Terminal />
        </ConfigureProvider>
      </WebSocketProvider>
      
    </div>
  );
};

export default CodeUploader;
