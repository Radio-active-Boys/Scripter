import React, { useState, useRef, useContext } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';
import { ImportButton, UploadButton } from './Button';
import { WebSocketContext } from '../HandleWebSocket/WebSocketContext';

const getLanguageFromExtension = (filename) => {
  const extension = filename.split('.').pop();
  switch (extension) {
    case 'py':
      return 'python';
    case 'cpp':
    case 'cc':
    case 'cxx':
    case 'h':
    case 'hpp':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'java':
      return 'java';
    case 'js':
      return 'javascript';
    case 'ts':
      return 'typescript';
    default:
      return 'plaintext';
  }
};

const CodeEditor = () => {
  const [fileContent, setFileContent] = useState('void setup()\n{\n\n}\n\n\nvoid loop()\n{\n\n}');
  const [language, setLanguage] = useState('cpp');
  const [filePath, setFilePath] = useState('code.ino');
  const editorRef = useRef(null);
  const { socket } = useContext(WebSocketContext);

  const handleEditorChange = (value, event) => {
    setFileContent(value);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const detectedLanguage = getLanguageFromExtension(file.name);
      setFileContent(content);
      setLanguage(detectedLanguage);
      setFilePath(file.name);
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(fileContent);
      console.log('File content sent');
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  const handleFilePathChange = (event) => {
    setFilePath(event.target.value);
  };

  return (
    <div className='flex width=100vw height=100vh'>
      <div className="editor-container">
        <Editor
          className="monaco-editor"
          width="90vw"
          height="70vh"
          language={language}
          value={fileContent}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
          }}
        />
      </div>
      <div className='button-container'>
        <div className='input-field'>
          <input
            type="text"
            className="file-path-input"
            value={filePath}
            onChange={handleFilePathChange}
          />
        </div>
        <ImportButton onFileSelect={handleFileUpload}></ImportButton>
        <UploadButton onClick={handleUpload}></UploadButton>
      </div>
    </div>
  );
};

export default CodeEditor;
