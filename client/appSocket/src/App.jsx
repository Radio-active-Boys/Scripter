import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeUploader from './components/CodeUploader/CodeUploader';
import ArduinoEmulator from './components/ArduinoEmulator/ArduinoEmulator';
import MainPage from './components/MainPage/Main';
import Modeller from './components/Modeller/Modeller';
const App = () => {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/code-uploader" element={<CodeUploader />} />
          <Route path="/arduino" element={<ArduinoEmulator />} />
          <Route path="/modeller" element={<Modeller />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
