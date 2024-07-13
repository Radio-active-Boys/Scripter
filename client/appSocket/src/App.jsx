import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeUploader from './components/CodeUploader/CodeUploader';
import ArduinoEmulator from './components/ArduinoEmulator/ArduinoEmulator';
import MainPage from './components/MainPage/Main';
const App = () => {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/code-uploader" element={<CodeUploader />} />
          <Route path="/arduino" element={<ArduinoEmulator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
