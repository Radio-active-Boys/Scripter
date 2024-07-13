import React, { useState, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import { ImportButton, UploadButton, ComplileButton } from "./Button";
import { WebSocketContext } from "../HandleWebSocket/WebSocketContext";
import { ConfigureContext } from "../Context/ConfigureContext";
import UpperInput from "../UpperInput";

const getLanguageFromExtension = (filename) => {
  const extension = filename.split(".").pop();
  switch (extension) {
    case "py":
      return "python";
    case "cpp":
    case "cc":
    case "cxx":
    case "h":
    case "hpp":
    case "ino":
      return "cpp";
    case "cs":
      return "csharp";
    case "java":
      return "java";
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    default:
      return "plaintext";
  }
};

const CodeEditor = () => {
  const [fileContent, setFileContent] = useState(
    `void setup() {
  // put your setup code here, to run once:
}

void loop() {
  // put your main code here, to run repeatedly:
}`
  );
  const [language, setLanguage] = useState("cpp");
  const [filePath, setFilePath] = useState("sketch.ino");
  const editorRef = useRef(null);
  const { socket } = useContext(WebSocketContext);
  const { getPort, getBoard, getBaud, getFQBN } = useContext(ConfigureContext);

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

  const sendUpload = {
    Type: "Upload",
    Port: getPort,
    Board: getFQBN,
    Baud: getBaud,
    Code: fileContent,
  };
  const sendCompile = {
    Type: "Compile",
    Port: getPort,
    Board: getFQBN,
    Baud: getBaud,
    Code: fileContent,
  };

  const handleUpload = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(sendUpload));
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  const handleCompile = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("FQBN send ", getFQBN);
      socket.send(JSON.stringify(sendCompile));
      console.log("Data sent:", sendCompile);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  const handleFilePathChange = (event) => {
    setFilePath(event.target.value);
  };

  return (
    <div className="flex">
      <div className="top-handler">
        <div>
          <div className="button-container">
            <ImportButton onFileSelect={handleFileUpload}></ImportButton>
            <UploadButton onClick={handleUpload}></UploadButton>
            <ComplileButton onClick={handleCompile}></ComplileButton>
          </div>
        </div>
        <div>
          <div>
            <UpperInput />
          </div>
        </div>
      </div>

      <div className="editor-container">
        <Editor
          className="monaco-editor"
          width="90vw"
          height="84vh"
          language={language}
          value={fileContent}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: "line",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
